import VueRouter from "vue-router";

export function authorizeRequestGuard(store) {
  const authorizeRequests = store.state.auth.authorizeRequests;
  return authorizeRequests.length > 0;
}

export function initializeGuard(store) {
  return !store.state.keyring.keyring.initialized;
}

export function appLockedGuard(store) {
  return !store.state.keyring.keyring.isUnlocked;
}

export default function (store, router: VueRouter) {
  router.beforeEach((to, _from, next) => {
    if (to.name !== "create-password" && initializeGuard(store)) {
      next("create-password");
      return;
    }

    if (to.name !== "authorize" && authorizeRequestGuard(store)) {
      next("authorize");
      return;
    }

    if (to.name !== "unlock" && appLockedGuard(store)) {
      next("unlock");
      return;
    }

    next();
  });
}
