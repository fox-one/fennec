import type { MutationTree, Module } from "vuex";
import type { RootState } from "../../types";
import { State, MutationTypes } from "./types";

const state: State = {
  transactionRequests: []
};

const mutations: MutationTree<State> = {
  [MutationTypes.UPDATE_MULTISIGS_TRANSACTIONS](state, data) {
    state.transactionRequests = data;
  }
};

const module: Module<State, RootState> = {
  namespaced: true,
  mutations,
  state
};

export default module;
