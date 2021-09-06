import { initPreferenceData } from "@foxone/fennec-base/state/init-data";
import { make } from "vuex-pathify";

const state: State.Preferencestate = {
  preference: initPreferenceData
};

const mutations = {
  ...make.mutations(state)
};

export default {
  mutations,
  namespaced: true,
  state
};
