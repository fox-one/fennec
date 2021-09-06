export const prefix = "keyring/";

export const GetterTypes = {
  CURRENT_PROFILE: "CURRENT_PROFILE"
};

export const MutationTypes = {
  SET_KEYRING: "SET_KEYRING",
  SET_PROFILES: "SET_PROFILES",
  SET_KEYRING_LOADING: "SET_KEYRING_LOADING",
  RESET_PROFILES: "RESET_PROFILES"
} as const;

export const ActionTypes = {
  LOAD_PROFILES: "LOAD_PROFILES"
} as const;
