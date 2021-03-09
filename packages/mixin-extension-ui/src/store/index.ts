import Vue from "vue";
import Vuex, { ModuleTree, createLogger } from "vuex";
import { RootState } from "./types";
import createPersistedState from "vuex-persistedstate";
import app from "./modules/app";
import auth from "./modules/auth";
import keyring from "./modules/keyring";
import preference from "./modules/preference";
import wallet from "./modules/wallet";
import transfer from "./modules/transfer";

export default function () {
  Vue.use(Vuex);

  const modules: ModuleTree<RootState> = {
    app,
    auth,
    keyring,
    preference,
    wallet,
    transfer
  };

  return new Vuex.Store({
    state: {},
    mutations: {},
    actions: {},
    modules,
    plugins: [
      createLogger(),
      createPersistedState({ key: "vuex", paths: ["wallet.additionAssets"] })
    ]
  });
}
