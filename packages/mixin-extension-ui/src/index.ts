import Vue from "vue";
import App from "./App.vue";
import createStore from "./store";
import createRouter from "./router";
import usePlugins from "./plugins";

import "./scss/index.scss";

export default function initializeUi(container: string) {
  const { vuetify } = usePlugins();
  const store = createStore();
  const router = createRouter();

  (window as any)._vue_ = new Vue({
    vuetify,
    el: container,
    store,
    router,
    render: (h) => h(App)
  });
}
