import { BUILD_IN_MIXIN_ACCOUNT_PROVIDER } from "../constants";
import { PerferenceStore } from "./types";

export const initKeyringData = {
  isUnlocked: false,
  initialized: false,
  accounts: []
};

export const initPerferenceData = {
  completeOnboarding: false,
  seletedAccount: undefined,
  accountProviders: [
    {
      type: "build-in",
      value: BUILD_IN_MIXIN_ACCOUNT_PROVIDER
    }
  ]
} as PerferenceStore;

export const initStoreData = {
  authUrls: {},
  keyring: undefined,
  preference: initPerferenceData
};
