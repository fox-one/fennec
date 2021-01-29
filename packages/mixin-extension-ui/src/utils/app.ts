import { AuthorizeRequest } from "@foxone/mixin-extension-base/state/auth";
import {
  MutationTypes as AuthMutationTypes,
  AuthModulePerfix
} from "../store/modules/auth/types";
import {
  MutationTypes as AppMutationTypes,
  AppModuleKey
} from "../store/modules/app/types";
import {
  MutationTypes as PreferenceMutationTypes,
  PreferenceModulePerfix
} from "../store/modules/preference/types";
import {
  MutationTypes as KeyringMutationTypes,
  KeyringModulePerfix
} from "../store/modules/keyring/types";
import registerGuard, {
  initializeGuard,
  authorizeRequestGuard,
  appLockedGuard
} from "../router/guard";

export function loadAuthorizeRequestsFromBackground(vm: Vue) {
  return new Promise<void>((resolve) => {
    vm.$messages.subscribeAuthorizeRequests((requests: AuthorizeRequest[]) => {
      console.log(
        "response: subscribeAuthorizeRequests",
        JSON.stringify(requests)
      );
      vm.$store.commit(
        AuthModulePerfix + AuthMutationTypes.UPDATE_AUTHORIZE_URLS,
        requests
      );
      resolve();
    });
  });
}

export function loadPerferenceFromBackground(vm: Vue) {
  return new Promise<void>((resolve) => {
    vm.$messages.subscribePreferenceState((state) => {
      console.log("response: subscribePreferenceState", JSON.stringify(state));
      vm.$store.commit(
        PreferenceModulePerfix + PreferenceMutationTypes.UPDATE_PREFRENCE,
        state
      );
      resolve();
    });
  });
}

export function loadKeyringFromBackground(vm: Vue) {
  return new Promise<void>((resolve) => {
    vm.$messages.subscribeKeyingState((state) => {
      console.log("response: loadKeyringFromBackground", JSON.stringify(state));
      vm.$store.commit(
        KeyringModulePerfix + KeyringMutationTypes.UPDATE_KEYRING_STATE,
        state
      );
      resolve();
    });
  });
}

export async function afterInit(vm: Vue) {
  registerGuard(vm.$store, vm.$router);

  const routeName = vm.$route.name;
  if (routeName !== "create-password" && initializeGuard(vm.$store)) {
    vm.$router.replace({ name: "create-password" });
    return;
  }

  if (routeName !== "authorize" && authorizeRequestGuard(vm.$store)) {
    vm.$router.replace({ name: "authorize" });
    return;
  }

  if (routeName !== "unlock" && appLockedGuard(vm.$store)) {
    vm.$router.replace({ name: "unlock" });
    return;
  }
}

export async function init(vm: Vue) {
  vm.$store.commit(AppModuleKey + AppMutationTypes.SET_INITING, true);
  await loadAuthorizeRequestsFromBackground(vm);
  await loadPerferenceFromBackground(vm);
  await loadKeyringFromBackground(vm);
  vm.$store.commit(AppModuleKey + AppMutationTypes.SET_INITING, false);

  afterInit(vm);
}
