declare namespace State {
  import type { RawTransactionReq } from "@foxone/fennec-base/state/wallet";

  export type MultisigsState = {
    transactionRequests: RawTransactionReq[];
  };
}
