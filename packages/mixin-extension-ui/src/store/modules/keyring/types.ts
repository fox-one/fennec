import type { Store as VuexStore, CommitOptions, DispatchOptions } from "vuex";
import type { KeyringMemState } from "@foxone/mixin-extension-base/state/keyring";

export const KeyringModulePerfix = "keyring/";

export const MutationTypes = {
  UPDATE_KEYRING_STATE: "UPDATE_KEYRING_STATE"
} as const;

export type State = { keyring: KeyringMemState };

export type Mutations = {
  [MutationTypes.UPDATE_KEYRING_STATE](s: State, v: KeyringMemState): void;
};

export type Getters = {};

export type Actions = {};

export type AppModuleType<S = State> = Omit<
  VuexStore<S>,
  "commit" | "getters" | "dispatch"
> & {
  commit<K extends keyof Mutations, P extends Parameters<Mutations[K]>[1]>(
    key: K,
    payload?: P,
    options?: CommitOptions
  ): ReturnType<Mutations[K]>;
} & {
  getters: {
    [K in keyof Getters]: ReturnType<Getters[K]>;
  };
} & {
  dispatch<K extends keyof Actions>(
    key: K,
    payload?: Parameters<Actions[K]>[1],
    options?: DispatchOptions
  ): ReturnType<Actions[K]>;
};
