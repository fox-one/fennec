import type {
  AppBarState,
  AppLayout,
  AppToastState,
  AppPayingState,
  AppSettings
} from "../../../types";
import { ActionContext } from "vuex";
import { RootState } from "../../types";

export const AppModulePerfix = "app/";

export const ActionTypes = {
  GET_COUTNER: "GET_COUTNER"
} as const;

export const MutationTypes = {
  SET_APPBAR: "SET_APPBAR",
  SET_APP_SETINGS: "SET_APP_SETTINGS",
  SET_INITING: "SET_INITING",
  SET_LAYOUT: "SET_LAYOUT",
  SET_PAYING: "SET_PAYING",
  SET_TOAST: "SET_TOAST"
} as const;

export type State = {
  initing: boolean;
  appbar: AppBarState;
  layout: AppLayout;
  settings: AppSettings;
  toast: AppToastState;
  paying: AppPayingState;
};

export type Mutations = {
  [MutationTypes.SET_INITING]: (s: State, v: boolean) => void;
  [MutationTypes.SET_APPBAR]: (s: State, v: Partial<AppBarState>) => void;
  [MutationTypes.SET_LAYOUT]: (s: State, v: AppLayout) => void;
  [MutationTypes.SET_APP_SETINGS]: (s: State, v: Partial<AppSettings>) => void;
  [MutationTypes.SET_TOAST]: (s: State, v: AppToastState) => void;
  [MutationTypes.SET_PAYING]: (s: State, v: AppPayingState) => void;
};

export type Getters = Record<string, unknown>;

type AugmentedActionContext = {
  commit<K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>;
} & Omit<ActionContext<State, RootState>, "commit">;

export type Actions = {
  [ActionTypes.GET_COUTNER]({ commit }: AugmentedActionContext): void;
};
