import type { State } from "../../../state/types";
import type { RawTransactionReq, TransferReq } from "../../../state/wallet";
import { createSubscription, unsubscribe } from "../subscriptions";

export default function createWalletHandlers(state: State) {
  return {
    transferSubscribe(id: string, port: chrome.runtime.Port): boolean {
      const cb = createSubscription<"pri(transfer.list)">(id, port);
      const subscription = state.wallet.transferRequestsSubject.subscribe(
        (requests: TransferReq[]) => {
          cb(requests);
        }
      );

      port.onDisconnect.addListener(() => {
        unsubscribe(id);
        subscription.unsubscribe();
      });

      return true;
    },

    multisigPaymentSubscribe(id: string, port: chrome.runtime.Port): boolean {
      const cb = createSubscription<"pri(multisigs.list)">(id, port);
      const subscription = state.wallet.multisigsTransactionsSubject.subscribe(
        (transactions: RawTransactionReq[]) => {
          cb(transactions);
        }
      );

      port.onDisconnect.addListener(() => {
        unsubscribe(id);
        subscription.unsubscribe();
      });

      return true;
    },

    approveTransfer({ id }) {
      const queued = state.wallet.getTransferRequest(id);
      if (!queued) {
        throw new Error("Cannot find transfer request");
      }
      const { resolve } = queued;
      resolve(true);
      return true;
    },

    rejectTransfer({ id }) {
      const queued = state.wallet.getTransferRequest(id);
      if (!queued) {
        throw new Error("Can not find transfer request");
      }
      const { reject } = queued;
      reject(new Error("Reject"));
      return false;
    },

    approveMultisigsPayment({ id }) {
      const queued = state.wallet.getMultisigsTransaction(id);
      if (!queued) {
        throw new Error("Can not find transaction");
      }
      const { resolve } = queued;
      resolve(true);
      return true;
    },

    rejectMultisigsPayment({ id }) {
      const queued = state.wallet.getMultisigsTransaction(id);
      if (!queued) {
        throw new Error("Can not find transaction");
      }
      const { reject } = queued;
      reject(new Error("Reject"));
      return false;
    }
  };
}
