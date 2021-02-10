import {
  ActionContext,
  Store as VuexStore,
  CommitOptions,
  DispatchOptions
} from "vuex";
import { RootState } from "../../types";

export const AppModuleKey = "app/";

export const ActionTypes = {
  GET_COUTNER: "GET_COUTNER"
} as const;

export const MutationTypes = {
  SET_INITING: "SET_INITING",
  SET_APPBAR: "SET_APPBAR",
  SET_LAYOUT: "SET_LAYOUT",
  SET_APP_SETINGS: "SET_APP_SETTINGS",
  SET_TOAST: "SET_TOAST",
  SET_PAYING: "SET_PAYING"
} as const;

export type State = {
  initing: boolean;
  appbar: MixinApp.AppBarState;
  layout: MixinApp.AppLayout;
  settings: MixinApp.AppSettings;
  toast: MixinApp.AppToastState;
  paying: MixinApp.AppPayingState;
};

export type Mutations = {
  [MutationTypes.SET_INITING]: (s: State, v: boolean) => void;
  [MutationTypes.SET_APPBAR]: (
    s: State,
    v: Partial<MixinApp.AppBarState>
  ) => void;
  [MutationTypes.SET_LAYOUT]: (s: State, v: MixinApp.AppLayout) => void;
  [MutationTypes.SET_APP_SETINGS]: (
    s: State,
    v: Partial<MixinApp.AppSettings>
  ) => void;
  [MutationTypes.SET_TOAST]: (s: State, v: MixinApp.AppToastState) => void;
  [MutationTypes.SET_PAYING]: (s: State, v: MixinApp.AppPayingState) => void;
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
