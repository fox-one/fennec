export const initKeyringData = {
  isUnlocked: false,
  initialized: false,
  accounts: []
};

export const initPerferenceData = {
  completeOnboarding: false,
  seletedAccount: undefined
};

export const initStoreData = {
  authUrls: {},
  keyring: undefined,
  preference: initPerferenceData
};
