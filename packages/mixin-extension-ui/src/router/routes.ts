import { RouteConfig } from "vue-router";
import Home from "../views/home.vue";
import Lock from "../views/lock.vue";
import UnLock from "../views/unlock.vue";
import Authorize from "../views/authorize.vue";
import CreatePassword from "../views/first-time-flow/create-password.vue";

const routes: RouteConfig[] = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/lock",
    name: "lock",
    component: Lock
  },
  {
    path: "/unlock",
    name: "unlock",
    component: UnLock
  },
  {
    path: "/authorize",
    name: "authorize",
    component: Authorize
  },
  {
    path: "/create-password",
    name: "create-password",
    component: CreatePassword
  }
];

export default routes;
