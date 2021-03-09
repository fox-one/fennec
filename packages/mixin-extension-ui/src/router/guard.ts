import VueRouter from "vue-router";

export function initializeGuard(store) {
  return !store.state.keyring.keyring.initialized;
}

export function appLockedGuard(store) {
  return !store.state.keyring.keyring.isUnlocked;
}

export function authorizeRequestGuard(store) {
  const authorizeRequests = store.state.auth.authorizeRequests;
  return authorizeRequests.length > 0;
}

export function transferRequestGuard(store) {
  const transferRequests = store.state.transfer.transferRequests;
  return transferRequests.length > 0;
}

export default function (store, router: VueRouter) {
  router.beforeEach((to, _from, next) => {
    if (initializeGuard(store)) {
      to.name === "init" ? next() : next("init");
      return;
    }

    if (authorizeRequestGuard(store)) {
      to.name === "authorize" ? next() : next("authorize");
      return;
    }

    if (appLockedGuard(store)) {
      to.name === "unlock" ? next() : next("unlock");
      return;
    }

    if (transferRequestGuard(store)) {
      to.name === "send-request" ? next() : next("send-request");
      return;
    }

    next();
  });
}
