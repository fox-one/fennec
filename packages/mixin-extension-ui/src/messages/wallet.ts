import { SendMessage } from "@foxone/mixin-extension-base/inject/types";
import {
  RawTransactionReq,
  TransferReq
} from "@foxone/mixin-extension-base/state/wallet";

export default function (sendMessage: SendMessage) {
  return {
    rejectTransferReq(id: string): Promise<boolean> {
      return sendMessage("pri(transfer.reject)", { id });
    },

    approveTransferReq(id: string): Promise<boolean> {
      return sendMessage("pri(transfer.approve)", { id });
    },

    subscribeTransferReq(
      cb: (requests: TransferReq[]) => void
    ): Promise<boolean> {
      return sendMessage("pri(transfer.list)", null, cb);
    },

    rejectMultisigsTransactionReq(id: string): Promise<boolean> {
      return sendMessage("pri(multisigs.reject)", { id });
    },

    approveMultisigsTransactionReq(id: string): Promise<boolean> {
      return sendMessage("pri(multisigs.approve)", { id });
    },

    subscribeMultisigsTransactionReq(
      cb: (requests: RawTransactionReq[]) => void
    ): Promise<boolean> {
      return sendMessage("pri(multisigs.list)", null, cb);
    }
  };
}
