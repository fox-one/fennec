import Vue from "vue";
import { make } from "vuex-pathify";
import { MutationTypes } from "./types";

const initState = {
  home: {
    category: 0,
    accepted: false
  },
  send: {
    contacts: [],
    transferForm: {
      asset: null,
      amount: "",
      opponent: "",
      memo: ""
    },
    withdrawForm: {
      asset: null,
      amount: "",
      address_id: ""
    }
  },
  snapshot: {
    detail: null
  }
};

const state = (): State.Page => initState;

const mutations = {
  [MutationTypes.UPDATE_SEND_CONTACTS](state, id) {
    const contacts = state.send.contacts;
    const temp = contacts.filter((x) => x !== id);

    if (temp.length >= 20) {
      temp.pop();
    }

    temp.unshift(id);
    state.send.contacts = temp;
  },

  [MutationTypes.REMOVE_SEND_CONTACTS](state, id) {
    state.send.contacts = state.send.contacts.filter((x) => x !== id);
  },

  [MutationTypes.SET_SNAPSHOT_DETAIL](state, value) {
    state.snapshot.detail = value;
  },

  [MutationTypes.RESET_PAGE_STATE](state) {
    for (const k in initState) {
      Vue.set(state, k, initState[k]);
    }
  },

  [MutationTypes.REMOVE_PAGE_DATA](state) {
    Vue.set(state.send, "transferForm", {
      asset: null,
      amount: "",
      opponent: "",
      memo: ""
    });
    Vue.set(state.send, "withdrawForm", {
      asset: null,
      amount: "",
      address_id: ""
    });
    Vue.set(state, "snapshot", {
      detail: null
    });
  },

  ...make.mutations(state)
};

export default {
  mutations,
  namespaced: true,
  state
};
