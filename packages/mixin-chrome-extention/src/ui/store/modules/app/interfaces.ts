import {
  ActionContext,
  Store as VuexStore,
  CommitOptions,
  DispatchOptions
} from "vuex";
import MutationTypes from "./mutation-types";
import ActionTypes from "./action-types";
import { RootState } from "../../interface";

export type State = {
  appbar: App.AppBarState;
};

export type Mutations = {
  [MutationTypes.SET_APPBAR]: (s: State, d: Partial<App.AppBarState>) => void;
};

export type Getters = {};

type AugmentedActionContext = {
  commit<K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>;
} & Omit<ActionContext<State, RootState>, "commit">;

export type Actions = {
  [ActionTypes.GET_COUTNER]({ commit }: AugmentedActionContext): void;
};

export type AppModuleTypes<S = State> = Omit<
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
