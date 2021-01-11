import Vue from "vue";
import App from "./App.vue";
import createStore from "./store";
import createRouter from "./router";
import usePlugins from "./plugins";

export default function initializeUi(container: string) {
  usePlugins();

  new Vue({
    el: container,
    store: createStore(),
    router: createRouter(),
    render: h => h(App)
  });
}
