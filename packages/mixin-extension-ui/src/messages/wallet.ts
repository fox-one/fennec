import { SendMessage } from "@foxone/mixin-extension-base/inject/types";
import {
  RawTransactionReq,
  TransferReq
} from "@foxone/mixin-extension-base/state/wallet";

export default function (sendMessage: SendMessage) {
  return {
    rejectTransferReq(id: string): Promise<boolean> {
      return sendMessage("pri_(transfer.reject)", { id });
    },

    approveTransferReq(id: string): Promise<boolean> {
      return sendMessage("pri_(transfer.approve)", { id });
    },

    subscribeTransferReq(
      cb: (requests: TransferReq[]) => void
    ): Promise<boolean> {
      return sendMessage("pri_(transfer.list)", null, cb);
    },

    rejectMultisigsTransactionReq(id: string): Promise<boolean> {
      return sendMessage("pri_(multisigs.reject)", { id });
    },

    approveMultisigsTransactionReq(id: string): Promise<boolean> {
      return sendMessage("pri_(multisigs.approve)", { id });
    },

    subscribeMultisigsTransactionReq(
      cb: (requests: RawTransactionReq[]) => void
    ): Promise<boolean> {
      return sendMessage("pri_(multisigs.list)", null, cb);
    }
  };
}
