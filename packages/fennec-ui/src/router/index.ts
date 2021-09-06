/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/unbound-method */
import Vue from "vue";
import VueRouter from "vue-router";
import routes from "./routes";

export default function () {
  Vue.use(VueRouter);

  const originalPush = VueRouter.prototype.push;

  // @ts-ignore
  VueRouter.prototype.push = function push(location, onResolve, onReject) {
    if (onResolve || onReject)
      return originalPush.call(this, location, onResolve, onReject);

    // @ts-ignore
    return originalPush.call(this, location).catch((err) => err);
  };

  const router = new VueRouter({
    mode: "hash",
    routes
  });

  return router;
}
