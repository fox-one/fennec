import type { State } from "../../../state/types";
import type { TransferReq } from "../../../state/wallet";
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
        throw new Error("Cannot find transfer request");
      }

      const { reject } = queued;
      reject(new Error("Reject"));

      return false;
    }
  };
}
