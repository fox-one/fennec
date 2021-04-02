import type { RawTransactionReq } from "@foxone/mixin-extension-base/state/wallet";

export const MultisigsModulePerfix = "multisigs/";

export const MutationTypes = {
  UPDATE_MULTISIGS_TRANSACTIONS: "UPDATE_MULTISIGS_TRANSACTIONS"
};

export type State = {
  transactionRequests: RawTransactionReq[];
};

export type Getters = {};

export type Actions = {};
