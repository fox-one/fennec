declare namespace State {
  import type { TransferReq } from "@foxone/fennec-base/state/wallet";

  export type TransferState = {
    transferRequests: TransferReq[];
  };
}
