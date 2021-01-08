import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import router from "./router";

export default function initializeUi(container: string) {
  new Vue({
    el: container,
    store,
    router,
    render: h => h(App)
  });
}
