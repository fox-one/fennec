import type { KeyringMemState } from "@foxone/fennec-base/state/keyring";

export const KeyringModulePerfix = "keyring/";

export const MutationTypes = {
  UPDATE_KEYRING_STATE: "UPDATE_KEYRING_STATE"
} as const;

export type State = { keyring: KeyringMemState };

export type Mutations = {
  [MutationTypes.UPDATE_KEYRING_STATE](s: State, v: KeyringMemState): void;
};
