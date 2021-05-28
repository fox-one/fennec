import type { PreferenceStore } from "@foxone/fennec-base/state/types";

export const PreferenceModulePerfix = "preference/";

export const MutationTypes = {
  UPDATE_PREFRENCE: "UPDATE_PREFRENCE"
} as const;

export type State = {
  preference: PreferenceStore;
};

export type Mutations = {
  [MutationTypes.UPDATE_PREFRENCE](s: State, data: PreferenceStore): void;
};
