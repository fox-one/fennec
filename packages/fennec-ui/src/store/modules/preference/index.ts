import type { State } from "./types";
import type { Module, MutationTree } from "vuex/types/index";

import { MutationTypes } from "./types";
import { initPreferenceData } from "@foxone/fennec-base/state/init-data";
import { RootState } from "../../types";

const state: State = {
  preference: initPreferenceData
};

const mutations: MutationTree<State> = {
  [MutationTypes.UPDATE_PREFRENCE](state, data) {
    state.preference = data;
  }
};

const module: Module<State, RootState> = {
  mutations,
  namespaced: true,
  state
};

export default module;
