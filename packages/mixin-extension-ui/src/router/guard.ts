import VueRouter from "vue-router";

export function authorizeRequestGuard(store) {
  const authorizeRequests = store.state.auth.authorizeRequests;
  return authorizeRequests.length > 0;
}

export function initializeGuard(store) {
  return !store.state.keyring.initialized;
}

export default function (store, router: VueRouter) {
  router.beforeEach((to, from, next) => {
    if (to.name !== "welcome" && initializeGuard(store)) {
      next("welcome");
      return;
    }

    if (to.name !== "authorize" && authorizeRequestGuard(store)) {
      next("authorize");
      return;
    }

    next();
  });
}
