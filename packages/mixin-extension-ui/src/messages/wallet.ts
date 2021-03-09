import { SendMessage } from "@foxone/mixin-extension-base/inject/types";
import { TransferReq } from "@foxone/mixin-extension-base/state/wallet";

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
    }
  };
}
