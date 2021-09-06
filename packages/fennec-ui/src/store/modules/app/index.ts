import { ActionTypes, MutationTypes } from "./types";
import { make } from "vuex-pathify";

export const initSettings: any = {
  colorStyle: "green_down_red_up",
  currency: "USD",
  dark: false,
  provider: ""
};

const state: State.AppState = {
  appbar: {
    back: false,
    show: true,
    title: ""
  },

  breadcrumbs: [],

  initing: true,

  layout: "desktop",

  settings: initSettings
};

const mutations = {
  ...make.mutations(state),

  [MutationTypes.SET_APPBAR](state, data) {
    const defaultValue = {
      back: true,
      show: true,
      style: "",
      title: ""
    };

    state.appbar = { ...defaultValue, ...data };
  },

  [MutationTypes.SET_SETINGS](state, data) {
    state.settings = { ...state.settings, ...data };
  },

  [MutationTypes.RESET_APP](state) {
    state.settings = initSettings;
  }
};

const actions = {
  [ActionTypes.GET_COUTNER]({ commit }) {
    commit(MutationTypes.SET_APPBAR, { title: "" });
  }
};

export default {
  actions,
  mutations,
  namespaced: true,
  state
};
