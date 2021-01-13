import Vue from "vue";
import Vuex, { ModuleTree } from "vuex";
import { RootState, Store } from "./interface";
import app from "./modules/app";

export default function() {
  Vue.use(Vuex);

  const modules: ModuleTree<RootState> = {
    app
  };

  return new Vuex.Store({
    state: {},
    mutations: {},
    actions: {},
    modules
  }) as Store;
}
