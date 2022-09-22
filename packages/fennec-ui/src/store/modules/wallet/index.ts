import { GetterTree } from "vuex/types/index";
import { RootState } from "../../types";
import { ActionTypes, MutationTypes, GetterTypes } from "./types";
import endpoints from "../../../endpoints";
import { make } from "vuex-pathify";
import { User } from "@foxone/mixin-api/types";

const state: State.WalletState = {
  additionAssets: [],
  assets: [],
  exchangeRates: [],
  me: null,
  users: [],
  authError: false
};

const getters: GetterTree<State.WalletState, RootState> = {
  [GetterTypes.TOTAL_USD](state) {
    return state.assets.reduce((total: number, asset) => {
      return total + Number(asset.price_usd) * Number(asset.balance);
    }, 0);
  },
  [GetterTypes.TOTAL_BTC](state) {
    return state.assets.reduce((total: number, asset) => {
      return total + Number(asset.price_btc) * Number(asset.balance);
    }, 0);
  },
  [GetterTypes.GET_ASSET_BY_ID](state) {
    return (id: string) => {
      return state.assets.find((x) => x.asset_id === id);
    };
  },
  [GetterTypes.GET_MERGED_ASSETS](state) {
    return [...state.assets, ...state.additionAssets];
  },
  [GetterTypes.GET_USER_BY_ID](state) {
    return (id: string) => {
      return state.users.find((x: User) => x.user_id === id);
    };
  }
};

const mutations = {
  ...make.mutations(state),
  [MutationTypes.SET_ASSET](state, asset) {
    const assets = state.assets.filter((x) => x.asset_id !== asset.asset_id);

    state.assets = [...assets, asset];
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
  [MutationTypes.SET_USERS](state, user) {
    const index = state.users.findIndex((x) => x.user_id === user.user_id);

    if (index > -1) {
      state.users.splice(index, 1);
    }

    if (state.users.length >= 50) {
      state.users.pop();
    }

    state.users.unshift(user);
  },
  [MutationTypes.RESET_WALLET](state) {
    state.assets = [];
    state.me = null;
    state.authError = false;
  }
};

const actions = {
  async [ActionTypes.LOAD_ASSET]({ commit }, id) {
    const asset = await endpoints.getAsset(id);

    commit(MutationTypes.SET_ASSET, asset);
  },
  async [ActionTypes.LOAD_ASSETS]({ commit, dispatch, state }) {
    const assets = await endpoints.getAssets();

    commit(MutationTypes.SET_ASSETS, assets);
    assets.forEach((x) => {
      const found = state.additionAssets.find((y) => y.asset_id === x.asset_id);

      if (found) {
        commit(MutationTypes.REMVOE_ADDITION_ASSET, x);
      }
    });

    [...state.additionAssets, ...assets].forEach((x) => {
      if (x.asset_id !== x.chain_id && !x.destination && !x.tag) {
        dispatch(ActionTypes.LOAD_ASSET, x.chain_id);
      }
    });
  },

  async [ActionTypes.LOAD_EXCHANGE_RATES]({ commit }) {
    const rates = await endpoints.getExchangeRates();

    commit(MutationTypes.SET_EXCHANGE_RATES, rates);
  },

  async [ActionTypes.LOAD_USER]({ commit, state }, { force, id }) {
    if (!id) return;

    const users = state.users;
    const user = users.find((x) => x.user_id === id);

    if (!force && user) {
      return user;
    }

    const resp = await endpoints.getUser(id);

    commit("SET_USERS", resp);

    return resp;
  },

  async [ActionTypes.LOAD_ME]({ commit }, { id }) {
    if (!id) return;

    commit("SET_ME", await endpoints.getUser(id));
  }
};

export default {
  actions,
  getters,
  mutations,
  namespaced: true,
  state
};
