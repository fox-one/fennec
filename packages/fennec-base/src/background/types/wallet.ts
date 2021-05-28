import {
  CreateTransferPayload,
  RawTransactionPayment
} from "@foxone/mixin-api/types";
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
  payload: unknown;
}

export interface MultiSigsPaymentPayload {
  transaction: RawTransactionPayment;
}

export interface WalletActionSignatures {
  "pri_(transfer.list)": [null, boolean, TransferReq[]];
  "pri_(transfer.approve)": [ApproveTransferPayload, boolean];
  "pri_(transfer.reject)": [RejectTransferPayload, boolean];
  "pri_(multisigs.list)": [null, boolean, RawTransactionReq[]];
  "pri_(multisigs.approve)": [ApproveMultisigsPayload, boolean];
  "pri_(multisigs.reject)": [RejectMultisigsPayload, boolean];

  "pub_(transfer.request)": [CreateTransferPayload, null];
  "pub_(multisigs.request)": [MultiSigsPaymentPayload, boolean];
  "pub_(token.sign)": [SignClientTokenPayload, string];
}
