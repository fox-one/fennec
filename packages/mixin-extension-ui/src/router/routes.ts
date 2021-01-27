import { RouteConfig } from "vue-router";
import Home from "../views/home.vue";
import Lock from "../views/lock.vue";
import UnLock from "../views/unlock.vue";
import Authorize from "../views/authorize.vue";
import Welcome from "../views/first-time-flow/welcome.vue";

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
    path: "/welcome",
    name: "welcome",
    component: Welcome
  }
];

export default routes;
