import type { Resolver } from "./types";
import type { AuthTabPayload } from "../background/types/auth";
import type { Store } from "./types";

import { BehaviorSubject } from "rxjs";
import { openPopup, stripUrl } from "../utils/helper";

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

  #windows = [];

  #store: BehaviorSubject<Store>;

  public readonly authSubject: BehaviorSubject<
    AuthorizeRequest[]
  > = new BehaviorSubject<AuthorizeRequest[]>([]);

  constructor(opts: { store: BehaviorSubject<Store> }) {
    this.#store = opts.store;
    this.#store.subscribe((data) => {
      this.#authUrls = data.authUrls;
    });
  }

  get authorizeRequests(): AuthorizeRequest[] {
    return Object.values(this.#authRequests).map(({ id, url, payload }) => ({
      id,
      url,
      payload
    }));
  }

  private updateAuthSubject() {
    this.authSubject.next(this.authorizeRequests);
  }

  private persistAuthUrls(data: Record<string, AuthUrlInfo>) {
    const newStore = { ...this.#store.getValue(), authUrls: data };
    this.#store.next(newStore);
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
        url,
        payload: { origin }
      } = this.#authRequests[id];

      const key = stripUrl(url);
      const value = {
        count: 0,
        id: idStr,
        isAllowed,
        origin,
        url
      };

      this.persistAuthUrls({
        ...this.#authUrls,
        [key]: value
      });
      delete this.#authRequests[id];
      this.updateAuthSubject();
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
        throw `The source ${url} is not allowed to interact with this extension`;
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

      this.updateAuthSubject();
      openPopup(this.#windows);
    });
  }

  public ensureUrlAuthorized(url: string): boolean {
    const entry = this.#authUrls[stripUrl(url)];

    if (!entry) {
      throw `The source ${url} has not been enabled yet`;
    }

    if (!entry.isAllowed) {
      throw `The source ${url} is not allowed to interact with this extension`;
    }

    return true;
  }

  public getAuthRequest(id: string): AuthRequest {
    return this.#authRequests[id];
  }
}
