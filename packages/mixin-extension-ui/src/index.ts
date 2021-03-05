import Vue from "vue";
import App from "./App.vue";
import createStore from "./store";
import createRouter from "./router";
import usePlugins from "./plugins";

import "./scss/index.scss";

export default function initializeUi(container: string) {
  const { vuetify, i18n } = usePlugins();
  const store = createStore();
  const router = createRouter();

  (window as any).__vue__ = new Vue({
    vuetify,
    el: container,
    store,
    router,
    i18n,
    render: (h) => h(App)
  });
}
