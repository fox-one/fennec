import { BUILD_IN_MIXIN_ACCOUNT_PROVIDER } from "../constants";
import { PreferenceStore } from "./types";

export const initKeyringData = {
  accounts: [],
  initialized: false,
  isUnlocked: false
};

export const initPreferenceData = {
  accountProviders: [
    {
      type: "built-in",
      value: BUILD_IN_MIXIN_ACCOUNT_PROVIDER
    }
  ],
  completeOnboarding: false,
  selectedAccount: undefined
} as PreferenceStore;

export const initStoreData = {
  authUrls: {},
  keyring: undefined,
  preference: initPreferenceData
};
