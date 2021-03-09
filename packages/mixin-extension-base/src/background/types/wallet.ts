import { CreateTransferPayload } from "@foxone/mixin-sdk/types";
import { TransferReq } from "../../state/wallet";

export interface ApproveTransferPayload {
  id: string;
}

export interface RejectTransferPayload {
  id: string;
}

export interface WalletActionSignatures {
  "pri(transfer.list)": [null, boolean, TransferReq[]];
  "pri(transfer.approve)": [ApproveTransferPayload, boolean];
  "pri(transfer.reject)": [RejectTransferPayload, boolean];

  "pub(transfer.request)": [CreateTransferPayload, null];
}
