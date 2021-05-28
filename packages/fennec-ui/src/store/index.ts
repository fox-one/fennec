import Vue from "vue";
import Vuex, { ModuleTree, Store } from "vuex";
import { RootState } from "./types";
import createPersistedState from "vuex-persistedstate";
import app from "./modules/app";
import auth from "./modules/auth";
import keyring from "./modules/keyring";
import preference from "./modules/preference";
import wallet from "./modules/wallet";
import transfer from "./modules/transfer";
import multisigs from "./modules/multisigs";

export default function (): Store<RootState> {
  Vue.use(Vuex);

  const modules: ModuleTree<RootState> = {
    app,
    auth,
    keyring,
    multisigs,
    preference,
    transfer,
    wallet
  };

  return new Vuex.Store({
    actions: {},
    modules,
    mutations: {},
    plugins: [
      createPersistedState({ key: "vuex", paths: ["wallet.additionAssets"] })
    ],
    state: {}
  });
}
