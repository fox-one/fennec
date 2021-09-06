// publics
import AccountInit from "../views/account/init.vue";
import AccountCreate from "../views/account/create.vue";
import AccountImport from "../views/account/import.vue";
import AccountProvider from "../views/account/provider.vue";
import AccountProviderEdit from "../views/account/provider-edit.vue";
import AccountProviderAdd from "../views/account/provider-add.vue";
import Help from "../views/help.vue";

// lockfrees
import Unlock from "../views/unlock.vue";

import Home from "../views/home.vue";
import Authorize from "../views/authorize.vue";
import Deposit from "../views/deposit.vue";
import Transfer from "../views/send/transfer.vue";
import Withdraw from "../views/send/withdraw.vue";
import AssetDetail from "../views/asset/detail.vue";
import SnapshotDetail from "../views/snapshot/_id.vue";
import Setting from "../views/setting/index.vue";
import BackUp from "../views/backup.vue";
import BackupConfirm from "../views/backup-confirm.vue";
import SendContacts from "../views/send/contacts.vue";
import AddressSelect from "../views/address/select.vue";
import AddressCreate from "../views/address/create.vue";
import AddressEdit from "../views/address/edit.vue";
import AssetAdd from "../views/asset/add.vue";
import AccountEdit from "../views/account/edit.vue";
import AccountOverview from "../views/account/overview.vue";

import type { RouteConfig } from "vue-router";

export const publics: RouteConfig[] = [
  {
    component: AccountInit,
    name: "account-init",
    path: "/account/init"
  },
  {
    component: AccountCreate,
    name: "account-create",
    path: "/account/create"
  },
  {
    component: AccountProvider,
    name: "account-provider",
    path: "/account/provider"
  },
  {
    component: AccountProviderEdit,
    name: "account-provider-edit",
    path: "/account/provider/edit"
  },
  {
    component: AccountProviderAdd,
    name: "account-provider-add",
    path: "/account/provider/add"
  },
  {
    component: AccountImport,
    name: "account-import",
    path: "/account/import"
  },
  {
    component: Help,
    name: "help",
    path: "/help"
  }
];

export const accounts = [
  {
    component: Authorize,
    name: "authorize",
    path: "/authorize"
  },
  {
    component: Setting,
    name: "setting",
    path: "/setting"
  },
  {
    component: BackUp,
    name: "backup",
    path: "/backup"
  },
  {
    component: BackupConfirm,
    name: "backup-confirm",
    path: "/backup/confirm"
  },
  {
    component: AccountEdit,
    name: "account-edit",
    path: "/account/edit"
  },
  {
    component: AccountOverview,
    name: "account-overview",
    path: "/account/overview"
  }
];

export const lockfrees: RouteConfig[] = [
  {
    component: Unlock,
    name: "unlock",
    path: "/unlock"
  }
];

export const wallets = [
  {
    component: Home,
    name: "home",
    path: "/"
  },
  {
    component: Deposit,
    name: "deposit",
    path: "/deposit"
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
    component: SendContacts,
    name: "send-contacts",
    path: "/send/contacts"
  },
  {
    component: AssetDetail,
    name: "asset-detail",
    path: "/asset/detail"
  },
  {
    component: SnapshotDetail,
    name: "snapshot-id",
    path: "/snapshot/:id"
  },
  {
    component: AddressSelect,
    name: "address-select",
    path: "/address/select"
  },
  {
    component: AddressCreate,
    name: "address-create",
    path: "/address/create"
  },
  {
    component: AddressEdit,
    name: "address-edit",
    path: "/address/edit"
  },
  {
    component: AssetAdd,
    name: "asset-add",
    path: "/asset/add"
  }
];

const routes: RouteConfig[] = [
  ...publics,
  ...lockfrees,
  ...wallets,
  ...accounts
];

export default routes;
