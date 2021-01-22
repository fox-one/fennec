import type { MutationTree, Module } from "vuex";
import type { RootState } from "../../types";
import { State, MutationTypes } from "./types";

const state: State = {
  authorizeRequests: []
};

const mutations: MutationTree<State> = {
  [MutationTypes.UPDATE_AUTHORIZE_URLS](state, data) {
    state.authorizeRequests = data;
  }
};

const module: Module<State, RootState> = {
  namespaced: true,
  mutations,
  state
};

export default module;
