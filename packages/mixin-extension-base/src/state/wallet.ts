import type { Resolver } from "./types";
import type PlatformState from "./platform";

import {
  CreateTransferPayload,
  RawTransactionPayment
} from "@foxone/mixin-sdk/types";
import { BehaviorSubject } from "rxjs";

export interface TransferRequestWithResolver extends Resolver<boolean> {
  id: string;
  payload: CreateTransferPayload;
}

export interface RawTransactionRequestWithResolver extends Resolver<boolean> {
  id: string;
  payload: RawTransactionPayment;
}

export interface TransferReq {
  id: string;
  payload: CreateTransferPayload;
}

export interface RawTransactionReq {
  id: string;
  payload: RawTransactionPayment;
}

let idCounter = 0;

function getId() {
  return `${Date.now()}.${++idCounter}`;
}

export default class WalletState {
  #transferRequests: TransferRequestWithResolver[] = [];

  #rawTransactionsRequests: RawTransactionRequestWithResolver[] = [];

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

  get rawTransactionReqs(): RawTransactionReq[] {
    return Object.values(this.#rawTransactionsRequests).map(
      ({ id, payload }) => ({
        id,
        payload
      })
    );
  }

  public readonly transferRequestsSubject: BehaviorSubject<any> = new BehaviorSubject(
    []
  );

  public readonly multisigsTransactionsSubject: BehaviorSubject<any> = new BehaviorSubject(
    []
  );

  private updateTransferRequestsSubject() {
    this.transferRequestsSubject.next(this.transferReqs);
  }

  private updateMultisigsTransactionSubject() {
    this.multisigsTransactionsSubject.next(this.rawTransactionReqs);
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

  completeMultisigsPayment(
    id: string,
    resolve: (result: boolean) => void,
    reject: (error: Error) => void
  ) {
    const complete = () => {
      delete this.#rawTransactionsRequests[id];
      this.updateMultisigsTransactionSubject();
    };
    return {
      reject: (error: Error) => {
        complete();
        reject(error);
      },
      resolve: (result: boolean) => {
        complete();
        resolve(result);
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

  public multisigsTransactionPayment(
    payload: RawTransactionPayment
  ): Promise<boolean> {
    const id = getId();
    return new Promise((resolve, reject) => {
      this.#rawTransactionsRequests[id] = {
        id,
        payload,
        ...this.completeMultisigsPayment(id, resolve, reject)
      };
      this.updateMultisigsTransactionSubject();
      this.#platform.showPopup();
      return true;
    });
  }

  public getTransferRequest(id: string): TransferRequestWithResolver {
    return this.#transferRequests[id];
  }

  public getMultisigsTransaction(
    id: string
  ): RawTransactionRequestWithResolver {
    return this.#rawTransactionsRequests[id];
  }
}
