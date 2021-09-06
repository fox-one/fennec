import { ActionTypes, MutationTypes } from "./types";
import { make } from "vuex-pathify";
import {
  loadSnapshots,
  loadExternalTransactions
} from "../../../utils/activity";

const state = {
  globalSnapshots: [],
  globalSnapshotsEnd: false,
  snapshots: [],
  snapshotsEnd: false,
  transactions: []
};

const mutations = {
  ...make.mutations(state)
};

const actions = {
  async [ActionTypes.LOAD_SNAPSHOTS](
    { commit, dispatch, state },
    { asset = undefined, reload = false } = {}
  ) {
    if (reload) {
      commit("SET_SNAPSHOTS_END", false);
      commit(MutationTypes.SET_SNAPSHOTS, []);
    }

    const current = reload ? [] : state.snapshots;
    const snapshots = await loadSnapshots(
      current,
      {
        asset,
        onEnd: () => {
          commit("SET_SNAPSHOTS_END", true);
        }
      },
      dispatch
    );

    commit(MutationTypes.SET_SNAPSHOTS, snapshots);
  },

  async [ActionTypes.LOAD_GLOBAL_SNAPSHOTS](
    { commit, dispatch, state },
    { reload = false } = {}
  ) {
    if (reload) {
      commit("SET_GLOBAL_SNAPSHOTS_END", false);
      commit(MutationTypes.SET_GLOBAL_SNAPSHOTS, []);
    }

    const current = reload ? [] : state.globalSnapshots;
    const snapshots = await loadSnapshots(
      current,
      {
        onEnd: () => {
          commit("SET_GLOBAL_SNAPSHOTS_END", true);
        }
      },
      dispatch
    );

    commit(MutationTypes.SET_GLOBAL_SNAPSHOTS, snapshots);
  },

  async [ActionTypes.LOAD_TRANSACTIONS](
    { commit },
    { destination = "", tag = "" } = {}
  ) {
    commit(MutationTypes.SET_TRANSACTIONS, []);

    const resp = await loadExternalTransactions({ destination, tag });

    commit(MutationTypes.SET_TRANSACTIONS, resp);
  }
};

export default {
  actions,
  mutations,
  namespaced: true,
  state
};
