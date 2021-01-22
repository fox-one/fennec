import Vue from "vue";
import VueRouter from "vue-router";
import routes from "./routes";

export default function () {
  Vue.use(VueRouter);

  return new VueRouter({
    mode: "hash",
    routes
  });
}
