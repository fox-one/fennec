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
  SnapshotQueryParams,
  ExternalTransactionParams
} from "@foxone/mixin-sdk/types";

const state: State = {
  assets: [],
  exchangeRates: [],
  snapshots: [],
  transactions: []
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
  }
};

const mutations: MutationTree<State> & Mutations = {
  [MutationTypes.SET_ASSETS](state, data) {
    state.assets = data;
  },
  [MutationTypes.SET_EXCHANGE_RATE](state, data) {
    state.exchangeRates = data;
  },
  [MutationTypes.SET_SNAPSHOTS](state, data) {
    state.snapshots = data;
  },
  [MutationTypes.SET_TRANSACTIONS](state, data) {
    state.transactions = data;
  }
};

const actions: ActionTree<State, RootState> & Actions = {
  async [ActionTypes.LOAD_ASSETS]({ commit }) {
    const assets = await endpoints.getAssets();
    commit(MutationTypes.SET_ASSETS, assets);
  },
  async [ActionTypes.LOAD_EXCHANGE_RATES]({ commit }) {
    const rates = await endpoints.getExchangeRates();
    commit(MutationTypes.SET_EXCHANGE_RATE, rates);
  },
  async [ActionTypes.LOAD_SNAPSHOTS]({ commit, state }, payload) {
    const snapshots = state.snapshots;
    let offset = "";

    if (!payload.reload) {
      const last = snapshots[snapshots.length - 1];
      offset = last?.created_at ?? "";
    }

    const opts: SnapshotQueryParams = { offset, limit: 20 };
    const res = await endpoints.getSnapshots(opts);
    commit(MutationTypes.SET_SNAPSHOTS, [...snapshots, ...res]);
  },
  async [ActionTypes.LOAD_TRANSACTIONS]({ commit }, payload) {
    const transactions = state.transactions;
    let offset = "";

    if (!payload.reload) {
      const last = transactions[transactions.length - 1];
      offset = last?.created_at;
    }

    const opts: ExternalTransactionParams = { offset, limit: 20 };
    const res = await endpoints.getExternalTransactions(opts);
    commit(MutationTypes.SET_TRANSACTIONS, res);
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
