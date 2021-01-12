import Vue from "vue";
import App from "./App.vue";
import createStore from "./store";
import createRouter from "./router";
import usePlugins from "./plugins";

import "./sass/index.scss";

export default function initializeUi(container: string) {
  const { vuetify } = usePlugins();

  new Vue({
    vuetify,
    el: container,
    store: createStore(),
    router: createRouter(),
    render: h => h(App)
  });
}
