import { make } from "vuex-pathify";

const state: State.AuthState = {
  authorizeRequests: []
};

const mutations = {
  ...make.mutations(state)
};

export default {
  mutations,
  namespaced: true,
  state
};
