import Vue from "vue";
import App from "./App.vue";
import createStore from "./store";
import createRouter from "./router";
import usePlugins from "./plugins";

import "./scss/index.scss";

export default function initializeUi(container: string) {
  const { i18n, vuetify } = usePlugins();
  const store = createStore();
  const router = createRouter();

  new Vue({
    el: container,
    i18n,
    render: (h) => h(App),
    router,
    store,
    vuetify
  });
}
