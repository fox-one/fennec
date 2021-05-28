import { SendMessage } from "@foxone/fennec-base/inject/types";
import {
  RawTransactionReq,
  TransferReq
} from "@foxone/fennec-base/state/wallet";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function (sendMessage: SendMessage) {
  return {
    approveMultisigsTransactionReq(id: string): Promise<boolean> {
      return sendMessage("pri_(multisigs.approve)", { id });
    },

    approveTransferReq(id: string): Promise<boolean> {
      return sendMessage("pri_(transfer.approve)", { id });
    },

    rejectMultisigsTransactionReq(id: string): Promise<boolean> {
      return sendMessage("pri_(multisigs.reject)", { id });
    },

    rejectTransferReq(id: string): Promise<boolean> {
      return sendMessage("pri_(transfer.reject)", { id });
    },

    subscribeMultisigsTransactionReq(
      cb: (requests: RawTransactionReq[]) => void
    ): Promise<boolean> {
      return sendMessage("pri_(multisigs.list)", null, cb);
    },

    subscribeTransferReq(
      cb: (requests: TransferReq[]) => void
    ): Promise<boolean> {
      return sendMessage("pri_(transfer.list)", null, cb);
    }
  };
}
