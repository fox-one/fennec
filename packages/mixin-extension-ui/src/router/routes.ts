import { RouteConfig } from "vue-router";
import Home from "../views/home.vue";
import Authorize from "../views/authorize.vue";
import Deposit from "../views/deposit.vue";
import Send from "../views/send/index.vue";
import Transfer from "../views/send/transfer.vue";
import Withdraw from "../views/send/withdraw.vue";
import AssetDetail from "../views/asset/_id.vue";
import SnapshotDetail from "../views/snapshot/_id.vue";
import Settings from "../views/settings/index.vue";
import Import from "../views/import.vue";
import BackUp from "../views/backup.vue";

const routes: RouteConfig[] = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/authorize",
    name: "authorize",
    component: Authorize
  },
  {
    path: "/deposit",
    name: "deposit",
    component: Deposit
  },
  {
    path: "/send",
    name: "send",
    component: Send
  },
  {
    path: "/send/transfer",
    name: "send-transfer",
    component: Transfer
  },
  {
    path: "/send/withdraw",
    name: "send-withdraw",
    component: Withdraw
  },
  {
    path: "/asset/:id",
    name: "asset-id",
    component: AssetDetail
  },
  {
    path: "/snapshot/:id",
    name: "snapshot-id",
    component: SnapshotDetail
  },
  {
    path: "/settings",
    name: "settings",
    component: Settings
  },
  {
    path: "/import",
    name: "import",
    component: Import
  },
  {
    path: "/backup",
    name: "backup",
    component: BackUp
  }
];

export default routes;
