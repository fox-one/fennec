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
  exchangeRates: [],
  snapshots: [],
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
    res = await Promise.all(
      res.map(
        async (x): Promise<Snapshot> => {
          const user = await dispatch(ActionTypes.LOAD_USER, {
            id: x.opponent_id
          });
          return { ...x, opponent: user.full_name };
        }
      )
    );
    const data = payload.reload ? res : [...snapshots, ...res];
    commit(MutationTypes.SET_SNAPSHOTS, data);
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
      limit: 20,
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