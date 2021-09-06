import { publics, lockfrees } from "./routes";

function getRedirectLocation(store, route) {
  const isPublic = publics.find((x) => x.name === route.name);
  const isLockfree = lockfrees.find((x) => x.name === route.name);

  const keyring = store.state.keyring.keyring;
  const inited = keyring.initialized;
  const locked = !keyring.isUnlocked;
  const accounts = keyring.accounts;

  if (!isPublic) {
    if (!inited) {
      return { name: "account-init" };
    }

    if (!isLockfree && locked) {
      return { name: "unlock" };
    }

    if (!locked && accounts.length === 0) {
      return { name: "account-init" };
    }
  }

  return;
}

export function checkCurrentRouter(vm: Vue) {
  const location = getRedirectLocation(vm.$store, vm.$route);

  if (location) {
    vm.$router.push(location);
  }
}

export function useGuard(vm: Vue) {
  checkCurrentRouter(vm);

  vm.$router.beforeEach((to, _from, next) => {
    const location = getRedirectLocation(vm.$store, to);

    location ? next(location) : next();
  });
}
