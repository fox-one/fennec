import {
  MutationTypes as AppMutaionTypes,
  ActionTypes as AppActionTypes,
  prefix as AppPrefix
} from "./modules/app/types";
import {
  MutationTypes as AuthMutaionTypes,
  prefix as AuthPrefix
} from "./modules/auth/types";
import {
  MutationTypes as KeyringMutaionTypes,
  ActionTypes as KeyringActionTypes,
  GetterTypes as KeyringGetterTypes,
  prefix as KeyringPrefix
} from "./modules/keyring/types";
import {
  MutationTypes as MultisigsMutaionTypes,
  prefix as MultisigsPrefix
} from "./modules/multisigs/types";
import {
  MutationTypes as PreferenceMutaionTypes,
  prefix as PreferencePrefix
} from "./modules/preference/types";
import {
  MutationTypes as TransferMutaionTypes,
  prefix as TransferPrefix
} from "./modules/transfer/types";
import {
  MutationTypes as WalletMutaionTypes,
  ActionTypes as WalletActionTypes,
  GetterTypes as WalletGetterTypes,
  prefix as WalletPrefix
} from "./modules/wallet/types";
import {
  prefix as ActivityPrefix,
  ActionTypes as ActivityActionTypes,
  MutationTypes as ActivityMutationTypes
} from "./modules/activity/types";
import {
  prefix as PagePrefix,
  MutationTypes as PageMutationTypes
} from "./modules/page/types";

function getGlobalTypes<T>(types: T, prefix: string) {
  return Object.keys(types).reduce(
    (m, k) => ({
      [k]: `${prefix}${types[k]}`,
      ...m
    }),
    {}
  ) as { [k in keyof T]: string };
}

export const GlobalMutations = {
  ...getGlobalTypes(AppMutaionTypes, AppPrefix),
  ...getGlobalTypes(AuthMutaionTypes, AuthPrefix),
  ...getGlobalTypes(KeyringMutaionTypes, KeyringPrefix),
  ...getGlobalTypes(MultisigsMutaionTypes, MultisigsPrefix),
  ...getGlobalTypes(PreferenceMutaionTypes, PreferencePrefix),
  ...getGlobalTypes(TransferMutaionTypes, TransferPrefix),
  ...getGlobalTypes(WalletMutaionTypes, WalletPrefix),
  ...getGlobalTypes(ActivityMutationTypes, ActivityPrefix),
  ...getGlobalTypes(PageMutationTypes, PagePrefix)
};

export const GlobalActions = {
  ...getGlobalTypes(AppActionTypes, AppPrefix),
  ...getGlobalTypes(WalletActionTypes, WalletPrefix),
  ...getGlobalTypes(KeyringActionTypes, KeyringPrefix),
  ...getGlobalTypes(ActivityActionTypes, ActivityPrefix)
};

export const GlobalGetters = {
  ...getGlobalTypes(WalletGetterTypes, WalletPrefix),
  ...getGlobalTypes(KeyringGetterTypes, KeyringPrefix)
};

export type RootState = Record<string, unknown>;
