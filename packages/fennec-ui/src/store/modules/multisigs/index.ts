import { make } from "vuex-pathify";

const state: State.MultisigsState = {
  transactionRequests: []
};

const mutations = {
  ...make.mutations(state)
};

export default {
  mutations,
  namespaced: true,
  state
};
