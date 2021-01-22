import type { Resolver } from "./types";
import type { AuthTabPayload } from "../background/types/auth";

import { BehaviorSubject } from "rxjs";
import { openPopup, closePopup, stripUrl } from "../utils/helper";

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

const AUTH_URLS_KEY = "authUrls";

let idCounter = 0;

function getId() {
  return `${Date.now()}.${++idCounter}`;
}

export default class AuthState {
  readonly #authUrls: Record<string, AuthUrlInfo> = {};

  readonly #authRequests: Record<string, AuthRequest> = {};

  #windows = [];

  public readonly authSubject: BehaviorSubject<AuthorizeRequest[]> = new BehaviorSubject<AuthorizeRequest[]>([]);

  constructor() {
    const authString = localStorage.getItem(AUTH_URLS_KEY) || "{}";
    const previousAuth = JSON.parse(authString) as Record<string, AuthUrlInfo>;

    this.#authUrls = previousAuth;
  }

  get authorizeRequests(): AuthorizeRequest[] {
    return Object.values(this.#authRequests).map(({ id, url, payload }) => ({ id, url, payload }));
  }

  private updateAuthSubject() {
    this.authSubject.next(this.authorizeRequests);
  }

  private saveCurrentAuthList() {
    localStorage.setItem(AUTH_URLS_KEY, JSON.stringify(this.#authUrls));
  }

  private authComplete(id: string, resolve: (result: boolean) => void, reject: (error: Error) => void) {
    const complete = (result: boolean | Error) => {
      const isAllowed = result === true;
      const {
        idStr,
        url,
        payload: { origin }
      } = this.#authRequests[id];

      this.#authUrls[stripUrl(url)] = {
        count: 0,
        id: idStr,
        isAllowed,
        origin,
        url
      };
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

  public async authorizeUrl(url: string, payload: AuthTabPayload): Promise<boolean> {
    const idStr = stripUrl(url);

    if (this.#authUrls[idStr]) {
      if (!this.#authUrls[idStr].isAllowed) {
        throw `The source ${url} is not allowed to interact with this extension`;
      }

      return false;
    }

    return new Promise((resolve, reject) => {
      const id = getId();

      this.#authRequests[id] = {
        ...this.authComplete(id, resolve, reject),
        id,
        idStr,
        payload,
        url
      };

      openPopup(this.#windows);
      this.updateAuthSubject();
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
