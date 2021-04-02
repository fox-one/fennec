import {
  CreateTransferPayload,
  RawTransactionPayment
} from "@foxone/mixin-sdk/types";
import { TransferReq, RawTransactionReq } from "../../state/wallet";

export interface ApproveTransferPayload {
  id: string;
}

export interface RejectTransferPayload {
  id: string;
}
export interface ApproveMultisigsPayload {
  id: string;
}

export interface RejectMultisigsPayload {
  id: string;
}

export interface SignClientTokenPayload {
  payload: any;
}

export interface MultiSigsPaymentPayload {
  transaction: RawTransactionPayment;
}

export interface WalletActionSignatures {
  "pri(transfer.list)": [null, boolean, TransferReq[]];
  "pri(transfer.approve)": [ApproveTransferPayload, boolean];
  "pri(transfer.reject)": [RejectTransferPayload, boolean];
  "pri(multisigs.list)": [null, boolean, RawTransactionReq[]];
  "pri(multisigs.approve)": [ApproveMultisigsPayload, boolean];
  "pri(multisigs.reject)": [RejectMultisigsPayload, boolean];

  "pub(transfer.request)": [CreateTransferPayload, null];
  "pub(multisigs.request)": [MultiSigsPaymentPayload, boolean];
  "pub(token.sign)": [SignClientTokenPayload, string];
}
