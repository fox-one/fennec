import Vue from "vue";
import VueRouter from "vue-router";
import routes from "./routes";

export default function () {
  Vue.use(VueRouter);

  const router = new VueRouter({
    mode: "hash",
    routes
  });

  return router;
}
