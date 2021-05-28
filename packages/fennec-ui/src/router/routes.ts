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
import AuthUrls from "../views/settings/auth-urls.vue";
import Import from "../views/import.vue";
import BackUp from "../views/backup.vue";

const routes: RouteConfig[] = [
  {
    component: Home,
    name: "home",
    path: "/"
  },
  {
    component: Authorize,
    name: "authorize",
    path: "/authorize"
  },
  {
    component: Deposit,
    name: "deposit",
    path: "/deposit"
  },
  {
    component: Send,
    name: "send",
    path: "/send"
  },
  {
    component: Transfer,
    name: "send-transfer",
    path: "/send/transfer"
  },
  {
    component: Withdraw,
    name: "send-withdraw",
    path: "/send/withdraw"
  },
  {
    component: AssetDetail,
    name: "asset-id",
    path: "/asset/:id"
  },
  {
    component: SnapshotDetail,
    name: "snapshot-id",
    path: "/snapshot/:id"
  },
  {
    component: Settings,
    name: "settings",
    path: "/settings"
  },
  {
    component: AuthUrls,
    name: "settings-authUrls",
    path: "/settings/authUrls"
  },
  {
    component: Import,
    name: "import",
    path: "/import"
  },
  {
    component: BackUp,
    name: "backup",
    path: "/backup"
  }
];

export default routes;
