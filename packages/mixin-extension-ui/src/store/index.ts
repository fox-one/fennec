import Vue from "vue";
import Vuex, { ModuleTree } from "vuex";
import { RootState, Store } from "./types";
import app from "./modules/app";
import auth from "./modules/auth";
import keyring from "./modules/keyring";
import preference from "./modules/preference";

export default function () {
  Vue.use(Vuex);

  const modules: ModuleTree<RootState> = {
    app,
    auth,
    keyring,
    preference
  };

  return new Vuex.Store({
    state: {},
    mutations: {},
    actions: {},
    modules
  }) as Store;
}
