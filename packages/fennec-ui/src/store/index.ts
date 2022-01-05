import Vue from "vue";
import pathify from "vuex-pathify";
import Vuex, { ModuleTree, Store, createLogger } from "vuex";
import { RootState } from "./types";
import createPersistedState from "vuex-persistedstate";
import app from "./modules/app";
import page from "./modules/page";
import auth from "./modules/auth";
import keyring from "./modules/keyring";
import preference from "./modules/preference";
import activity from "./modules/activity";
import wallet from "./modules/wallet";
import transfer from "./modules/transfer";
import multisigs from "./modules/multisigs";

pathify.options.mapping = "standard";
pathify.options.deep = 2;

export default function (): Store<RootState> {
  Vue.use(Vuex);

  const modules: ModuleTree<RootState> = {
    activity,
    app,
    auth,
    keyring,
    multisigs,
    page,
    preference,
    transfer,
    wallet
  };

  const store = new Vuex.Store({
    modules,
    mutations: {},
    plugins: [
      pathify.plugin,
      createLogger(),
      createPersistedState({
        key: "vuex",
        paths: [
          "app.settings",
          "wallet.additionAssets",
          "wallet.users",
          "page.send.contacts",
          "page.home.category",
          "page.home.accepted",
          "page.snapshot.detail"
        ]
      })
    ],
    state: {}
  });

  return store;
}
