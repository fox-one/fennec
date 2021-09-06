import { make } from "vuex-pathify";

const state: State.TransferState = {
  transferRequests: []
};

const mutations = {
  ...make.mutations(state)
};

export default {
  mutations,
  namespaced: true,
  state
};
