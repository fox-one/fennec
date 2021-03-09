import type { MutationTree, Module } from "vuex";
import type { RootState } from "../../types";
import { State, MutationTypes } from "./types";

const state: State = {
  transferRequests: []
};

const mutations: MutationTree<State> = {
  [MutationTypes.UPDATE_TRANSFER_URLS](state, data) {
    state.transferRequests = data;
  }
};

const module: Module<State, RootState> = {
  namespaced: true,
  mutations,
  state
};

export default module;
