import { RouteConfig } from "vue-router";
import Home from "@/ui/views/home.vue";
import Lock from "@/ui/views/lock.vue";
import UnLock from "@/ui/views/unlock.vue";

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
  }
];

export default routes;
