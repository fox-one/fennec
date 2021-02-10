import Vue from "vue";
import Vuex, { ModuleTree, createLogger } from "vuex";
import { RootState } from "./types";
import app from "./modules/app";
import auth from "./modules/auth";
import keyring from "./modules/keyring";
import preference from "./modules/preference";
import wallet from "./modules/wallet";

export default function () {
  Vue.use(Vuex);

  const modules: ModuleTree<RootState> = {
    app,
    auth,
    keyring,
    preference,
    wallet
  };

  return new Vuex.Store({
    state: {},
    mutations: {},
    actions: {},
    modules,
    plugins: [createLogger()]
  });
}
