import { MutationTree, Module } from "vuex/types/index";
import { RootState } from "../../types";
import { State, MutationTypes } from "./types";
import { initKeyringData } from "@foxone/fennec-base/state/init-data";

const state: State = {
  keyring: initKeyringData
};

const mutations: MutationTree<State> = {
  [MutationTypes.UPDATE_KEYRING_STATE](state, data) {
    state.keyring = { ...state.keyring, ...data };
  }
};

const module: Module<State, RootState> = {
  mutations,
  namespaced: true,
  state
};

export default module;
