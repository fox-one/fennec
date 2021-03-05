import { ActionTree, MutationTree, GetterTree, Module } from "vuex/types/index";
import { RootState } from "../../types";
import {
  State,
  Mutations,
  Actions,
  ActionTypes,
  MutationTypes,
  GetterKeys
} from "./types";
import endpoints from "../../../endpoints";
import {
  Snapshot,
  SnapshotQueryParams,
  ExternalTransactionParams
} from "@foxone/mixin-sdk/types";

const state: State = {
  assets: [],
  additionAssets: [],
  exchangeRates: [],
  snapshots: [],
  snapshotsLoaded: false,
  transactions: [],
  users: []
};

const getters: GetterTree<State, RootState> = {
  [GetterKeys.TOTAL_USD](state) {
    return state.assets.reduce((total, asset) => {
      return total + Number(asset.price_usd) * Number(asset.balance);
    }, 0);
  },
  [GetterKeys.TOTAL_BTC](state) {
    return state.assets.reduce((total, asset) => {
      return total + Number(asset.price_btc) * Number(asset.balance);
    }, 0);
  },
  [GetterKeys.GET_ASSET_BY_ID](state) {
    return (id: string) => {
      return state.assets.find((x) => x.asset_id === id);
    };
  },
  [GetterKeys.GET_MERGED_ASSETS](state) {
    return [...state.assets, ...state.additionAssets];
  }
};

const mutations: MutationTree<State> & Mutations = {
  [MutationTypes.SET_ASSETS](state, data) {
    state.assets = data;
  },
  [MutationTypes.ADD_ADDITION_ASSET](state, asset) {
    const assets = [...state.assets, ...state.additionAssets];
    const added = assets.find((x) => x.asset_id === asset.asset_id);
    if (!added) {
      state.additionAssets = [...state.additionAssets, asset];
    }
  },
  [MutationTypes.REMVOE_ADDITION_ASSET](state, asset) {
    state.additionAssets = state.additionAssets.filter(
      (x) => x.asset_id !== asset.asset_id
    );
  },
  [MutationTypes.SET_EXCHANGE_RATE](state, data) {
    state.exchangeRates = data;
  },
  [MutationTypes.SET_SNAPSHOTS](state, data) {
    state.snapshots = data;
  },
  [MutationTypes.SET_SNAPSHOTS_LOADED](state, value) {
    state.snapshotsLoaded = value;
  },
  [MutationTypes.SET_TRANSACTIONS](state, data) {
    state.transactions = data;
  },
  [MutationTypes.SET_USERS](state, user) {
    if (!state.users.find((x) => x.user_id === user.user_id)) {
      state.users = [...state.users, user];
    }
  }
};

const actions: ActionTree<State, RootState> & Actions = {
  async [ActionTypes.LOAD_ASSETS]({ commit }) {
    const assets = await endpoints.getAssets();
    assets.forEach((x) => {
      const found = state.additionAssets.find((y) => y.asset_id === x.asset_id);
      if (found) {
        commit(MutationTypes.REMVOE_ADDITION_ASSET, x);
      }
    });
    commit(MutationTypes.SET_ASSETS, assets);
  },

  async [ActionTypes.LOAD_EXCHANGE_RATES]({ commit }) {
    const rates = await endpoints.getExchangeRates();
    commit(MutationTypes.SET_EXCHANGE_RATE, rates);
  },

  async [ActionTypes.LOAD_SNAPSHOTS]({ commit, state, dispatch }, payload) {
    const snapshots = state.snapshots;
    let offset = "";

    if (!payload.reload) {
      const last = snapshots[snapshots.length - 1];
      offset = last?.created_at ?? "";
    }

    const opts: SnapshotQueryParams = {
      offset,
      limit: 20,
      asset: payload.asset
    };

    let res = await endpoints.getSnapshots(opts);
    res = res.filter(
      (x) => !state.snapshots.find((y) => x.snapshot_id === y.snapshot_id)
    );
    res = await Promise.all(
      res.map(
        async (x): Promise<Snapshot> => {
          if (x.opponent_id) {
            const user = await dispatch(ActionTypes.LOAD_USER, {
              id: x.opponent_id
            });
            return { ...x, opponent: user.full_name };
          }
          return x;
        }
      )
    );
    const data = payload.reload ? res : [...snapshots, ...res];
    commit(MutationTypes.SET_SNAPSHOTS, data);
    if (res.length <= 0) {
      commit(MutationTypes.SET_SNAPSHOTS_LOADED, true);
    } else {
      commit(MutationTypes.SET_SNAPSHOTS_LOADED, false);
    }
  },

  async [ActionTypes.LOAD_TRANSACTIONS]({ commit }, payload) {
    const transactions = state.transactions;
    let offset = "";

    if (!payload.reload) {
      const last = transactions[transactions.length - 1];
      offset = last?.created_at;
    }

    const opts: ExternalTransactionParams = {
      offset,
      limit: 100,
      destination: payload.destination,
      tag: payload.tag
    };
    const res = await endpoints.getExternalTransactions(opts);
    const data = payload.reload ? res : [...transactions, ...res];
    commit(MutationTypes.SET_TRANSACTIONS, data);
  },

  async [ActionTypes.LOAD_USER]({ commit, state }, { id }) {
    const users = state.users;
    const user = users.find((x) => x.user_id === id);
    if (user) {
      return user;
    }

    const res = await endpoints.getUser(id);
    commit("SET_USERS", res);
    return res;
  }
};

const module: Module<State, RootState> = {
  namespaced: true,
  getters,
  mutations,
  actions,
  state
};

export default module;
