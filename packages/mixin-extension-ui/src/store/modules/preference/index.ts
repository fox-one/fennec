import type { State } from "./types";
import type { Module, MutationTree } from "vuex/types/index";

import { MutationTypes } from "./types";
import { initPerferenceData } from "@foxone/mixin-extension-base/state/init-data";
import { RootState } from "../../types";

const state: State = {
  preference: initPerferenceData
};

const mutations: MutationTree<State> = {
  [MutationTypes.UPDATE_PREFRENCE](state, data) {
    state.preference = data;
  }
};

const module: Module<State, RootState> = {
  namespaced: true,
  mutations,
  state
};

export default module;
