import { BUILD_IN_MIXIN_ACCOUNT_PROVIDER } from "../constants";
import { PreferenceStore } from "./types";

export const initKeyringData = {
  isUnlocked: false,
  initialized: false,
  accounts: []
};

export const initPreferenceData = {
  completeOnboarding: false,
  seletedAccount: undefined,
  accountProviders: [
    {
      type: "built-in",
      value: BUILD_IN_MIXIN_ACCOUNT_PROVIDER
    }
  ]
} as PreferenceStore;

export const initStoreData = {
  authUrls: {},
  keyring: undefined,
  preference: initPreferenceData
};
