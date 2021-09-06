import { MutationTypes, ActionTypes, GetterTypes } from "./types";
import { initKeyringData } from "@foxone/fennec-base/state/init-data";
import { make } from "vuex-pathify";
import endpoints from "../../../endpoints";

const state: State.KeyringState = {
  keyring: initKeyringData,
  profiles: [],
  loading: true
};

const getters = {
  [GetterTypes.CURRENT_PROFILE](state, getters, rootState) {
    const preference = rootState.preference.preference;
    const selectedAccount = preference.selectedAccount;

    return state.profiles.find((x) => x.user_id === selectedAccount);
  }
};

const mutations = {
  ...make.mutations(state),
  [MutationTypes.SET_KEYRING](state, data) {
    state.keyring = { ...state.keyring, ...data };
  },
  [MutationTypes.SET_KEYRING_LOADING](state, value) {
    state.loading = value;
  },
  [MutationTypes.RESET_PROFILES](state) {
    state.profiles = [];
    state.loading = false;
  }
};

const actions = {
  async [ActionTypes.LOAD_PROFILES]({ commit, state }) {
    const { accounts, initialized, isUnlocked } = state.keyring;

    if (initialized && isUnlocked) {
      const actions = accounts.map(async (id: string) => {
        return await endpoints.getUser(id);
      });
      const profiles = await Promise.all(actions);

      console.log(actions, profiles);

      commit(MutationTypes.SET_PROFILES, profiles);
    }
  }
};

export default {
  actions,
  getters,
  mutations,
  namespaced: true,
  state
};
