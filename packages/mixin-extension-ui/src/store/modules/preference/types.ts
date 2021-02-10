import type { Store as VuexStore, CommitOptions, DispatchOptions } from "vuex";
import type { PerferenceStore } from "@foxone/mixin-extension-base/state/types";

export const PreferenceModulePerfix = "preference/";

export const MutationTypes = {
  UPDATE_PREFRENCE: "UPDATE_PREFRENCE"
} as const;

export type State = {
  preference: PerferenceStore;
};

export type Mutations = {
  [MutationTypes.UPDATE_PREFRENCE](s: State, data: PerferenceStore): void;
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
