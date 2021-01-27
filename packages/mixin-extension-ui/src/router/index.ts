import Vue from "vue";
import VueRouter from "vue-router";
import routes from "./routes";
import registerGuard from "./guard";

export default function (store) {
  Vue.use(VueRouter);

  const router = new VueRouter({
    mode: "hash",
    routes
  });

  registerGuard(store, router);

  return router;
}
