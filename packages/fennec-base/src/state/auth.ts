import type { Resolver, Store } from "./types";
import type { AuthTabPayload } from "../background/types/auth";

import type PlatformState from "./platform";

import { BehaviorSubject } from "rxjs";
import { stripUrl } from "../utils/helper";

export interface AuthUrlInfo {
  count: number;
  id: string;
  isAllowed: boolean;
  origin: string;
  url: string;
}

export interface AuthRequest extends Resolver<boolean> {
  id: string;
  idStr: string;
  url: string;
  payload: AuthTabPayload;
}
export interface AuthorizeRequest {
  id: string;
  url: string;
  payload: AuthTabPayload;
}

let idCounter = 0;

function getId() {
  return `${Date.now()}.${++idCounter}`;
}

export default class AuthState {
  #authUrls: Record<string, AuthUrlInfo> = {};

  #authRequests: Record<string, AuthRequest> = {};

  #platform: PlatformState;

  #store: BehaviorSubject<Store>;

  public readonly authRequestsSubject: BehaviorSubject<AuthorizeRequest[]> =
    new BehaviorSubject<AuthorizeRequest[]>([]);

  constructor(opts: {
    store: BehaviorSubject<Store>;
    platform: PlatformState;
  }) {
    this.#platform = opts.platform;
    this.#store = opts.store;
    this.restore();
  }

  get authorizeRequests(): AuthorizeRequest[] {
    return Object.values(this.#authRequests).map(({ id, payload, url }) => ({
      id,
      payload,
      url
    }));
  }

  private authComplete(
    id: string,
    resolve: (result: boolean) => void,
    reject: (error: Error) => void
  ) {
    const complete = (result: boolean | Error) => {
      const isAllowed = result === true;
      const {
        idStr,
        payload: { origin },
        url
      } = this.#authRequests[id];

      const key = stripUrl(url);
      const value = {
        count: 0,
        id: idStr,
        isAllowed,
        origin,
        url
      };

      this.persist({
        ...this.#authUrls,
        [key]: value
      });
      delete this.#authRequests[id];
      this.updateAuthRequestsSubject();
    };

    return {
      reject: (error: Error) => {
        complete(error);
        reject(error);
      },
      resolve: (result: boolean) => {
        complete(result);
        resolve(result);
      }
    };
  }

  public async authorizeUrl(
    url: string,
    payload: AuthTabPayload
  ): Promise<boolean> {
    const idStr = stripUrl(url);

    if (this.#authUrls[idStr]) {
      if (!this.#authUrls[idStr].isAllowed) {
        throw new Error(
          `The source ${url} is not allowed to interact with this extension`
        );
      }

      return true;
    }

    const found = Object.entries(this.#authRequests).find(
      (x) => x[1].idStr === idStr
    );

    if (found) {
      return this.addOrUpdateAuthRequests({
        id: found[0],
        idStr,
        payload,
        url
      });
    } else {
      return this.addOrUpdateAuthRequests({
        id: getId(),
        idStr,
        payload,
        url
      });
    }
  }

  private addOrUpdateAuthRequests(opts: {
    id: string;
    idStr: string;
    payload: AuthTabPayload;
    url: string;
  }): Promise<boolean> {
    const { id, idStr, payload, url } = opts;

    return new Promise((resolve, reject) => {
      this.#authRequests[id] = {
        ...this.authComplete(id, resolve, reject),
        id,
        idStr,
        payload,
        url
      };

      this.updateAuthRequestsSubject();
      this.#platform.showPopup().catch((error) => {
        console.log("show popup error", error);
      });
    });
  }

  public ensureUrlAuthorized(url: string): boolean {
    const entry = this.#authUrls[stripUrl(url)];

    if (!entry) {
      throw new Error(`Thesource ${url} has not been enabled yet`);
    }

    if (!entry.isAllowed) {
      throw new Error(
        `The source ${url} is not allowed to interact with this extension`
      );
    }

    return true;
  }

  public getAuthRequest(id: string): AuthRequest {
    return this.#authRequests[id];
  }

  public getAuthUrls(): AuthUrlInfo[] {
    return Object.values(this.#authUrls);
  }

  public updateAuthUrl(id: string, data: AuthUrlInfo) {
    const authUrls = { ...this.#authUrls, [id]: data };

    this.persist(authUrls);

    return true;
  }

  public removeAuthRequests() {
    this.#authRequests = {};
    this.updateAuthRequestsSubject();
  }

  public restore() {
    this.#authUrls = this.#store.getValue().authUrls;
  }

  private persist(data: Record<string, AuthUrlInfo>) {
    this.#store.next({ ...this.#store.getValue(), authUrls: data });
    this.restore();
  }

  private updateAuthRequestsSubject() {
    this.authRequestsSubject.next(this.authorizeRequests);
  }
}
