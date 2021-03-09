import type { Resolver } from "./types";
import type PlatformState from "./platform";

import { CreateTransferPayload } from "@foxone/mixin-sdk/types";
import { BehaviorSubject } from "rxjs";

export interface TransferRequest extends Resolver<boolean> {
  id: string;
  payload: CreateTransferPayload;
}

export interface TransferReq {
  id: string;
  payload: CreateTransferPayload;
}

let idCounter = 0;

function getId() {
  return `${Date.now()}.${++idCounter}`;
}

export default class WalletState {
  #transferRequests: TransferRequest[] = [];

  #platform: PlatformState;

  constructor(opts: { platform: PlatformState }) {
    this.#platform = opts.platform;
  }

  get transferReqs(): TransferReq[] {
    return Object.values(this.#transferRequests).map(({ id, payload }) => ({
      id,
      payload
    }));
  }

  public readonly transferRequestsSubject: BehaviorSubject<any> = new BehaviorSubject(
    []
  );

  private updateTransferRequestsSubject() {
    this.transferRequestsSubject.next(this.transferReqs);
  }

  completeTransfer(
    id: string,
    resovle: (result: boolean) => void,
    reject: (error: Error) => void
  ) {
    const complete = () => {
      delete this.#transferRequests[id];
      this.updateTransferRequestsSubject();
    };

    return {
      reject: (error: Error) => {
        complete();
        reject(error);
      },
      resolve: (result: boolean) => {
        complete();
        resovle(result);
      }
    };
  }

  public transferRequest(payload: CreateTransferPayload): Promise<boolean> {
    const id = getId();
    return new Promise((resolve, reject) => {
      this.#transferRequests[id] = {
        id,
        payload,
        ...this.completeTransfer(id, resolve, reject)
      };

      this.updateTransferRequestsSubject();
      this.#platform.showPopup();
      return true;
    });
  }

  public getTransferRequest(id: string): TransferRequest {
    return this.#transferRequests[id];
  }
}
