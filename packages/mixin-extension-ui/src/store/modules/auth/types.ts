import type { Store as VuexStore, CommitOptions, DispatchOptions } from "vuex";
import type { AuthorizeRequest } from "@foxone/mixin-extension-base/state/auth";

export const AuthModulePerfix = "auth/";

export const MutationTypes = {
  UPDATE_AUTHORIZE_URLS: "UPDATE_AUTHORIZE_URLS"
} as const;

export type State = {
  authorizeRequests: AuthorizeRequest[];
};

export type Mutations = {
  [MutationTypes.UPDATE_AUTHORIZE_URLS](s: State, v: AuthorizeRequest[]): void;
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
