import { Module, MutationTree, ActionTree } from "vuex";
import { Mutations, State, Actions, ActionTypes, MutationTypes } from "./types";
import { RootState } from "../../types";

const state: State = {
  appbar: {
    back: false,
    show: true,
    title: ""
  },

  initing: true,

  layout: "default",

  paying: {
    timer: null,
    visible: false
  },

  settings: {
    colorStyle: "green_down_red_up",
    currency: "usd",
    dark: false
  },

  toast: {
    color: "info",
    message: "",
    show: false
  }
};

const mutations: MutationTree<State> & Mutations = {
  [MutationTypes.SET_INITING](state, value) {
    state.initing = value;
  },
  [MutationTypes.SET_APPBAR](state, data) {
    const defaultValue = {
      back: true,
      show: true,
      style: "",
      title: ""
    };

    state.appbar = { ...defaultValue, ...data };
  },
  [MutationTypes.SET_LAYOUT](state, data) {
    state.layout = data;
  },
  [MutationTypes.SET_APP_SETINGS](state, data) {
    state.settings = { ...state.settings, ...data };
  },
  [MutationTypes.SET_TOAST](state, data) {
    state.toast = data;
  },
  [MutationTypes.SET_PAYING](state, data) {
    state.paying = data;
  }
};

const actions: ActionTree<State, RootState> & Actions = {
  [ActionTypes.GET_COUTNER]({ commit }) {
    commit(MutationTypes.SET_APPBAR, { title: "" });
  }
};

const module: Module<State, RootState> = {
  actions,
  mutations,
  namespaced: true,
  state
};

export default module;
