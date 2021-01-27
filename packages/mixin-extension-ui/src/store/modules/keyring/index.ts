import { MutationTree, Module } from "vuex/types/index";
import { RootState } from "../../types";
import { State, MutationTypes } from "./types";
import { initKeyringData } from "@foxone/mixin-extension-base/state/init-data";

const state: State = initKeyringData;

const mutations: MutationTree<State> = {
  [MutationTypes.UPDATE_KEYRING_STATE](state, data) {
    state = { ...state, ...data };
  }
};

const module: Module<State, RootState> = {
  namespaced: true,
  mutations,
  state
};

export default module;
