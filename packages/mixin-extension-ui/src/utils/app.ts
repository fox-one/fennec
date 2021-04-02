import { AuthorizeRequest } from "@foxone/mixin-extension-base/state/auth";
import {
  RawTransactionReq,
  TransferReq
} from "@foxone/mixin-extension-base/state/wallet";
import {
  MutationTypes as AuthMutationTypes,
  AuthModulePerfix
} from "../store/modules/auth/types";
import {
  MutationTypes as AppMutationTypes,
  AppModulePerfix
} from "../store/modules/app/types";
import {
  MutationTypes as PreferenceMutationTypes,
  PreferenceModulePerfix
} from "../store/modules/preference/types";
import {
  MutationTypes as KeyringMutationTypes,
  KeyringModulePerfix
} from "../store/modules/keyring/types";
import {
  ActionTypes as WalletActionTypes,
  WalletModulePerfix
} from "../store/modules/wallet/types";
import {
  MutationTypes as TransferMutationTypes,
  TransferModulePerfix
} from "../store/modules/transfer/types";
import {
  MutationTypes as MultisigsMutationTypes,
  MultisigsModulePerfix
} from "../store/modules/multisigs/types";

export function loadAuthorizeRequestsFromBackground(vm: Vue) {
  return new Promise<void>((resolve) => {
    vm.$messages.subscribeAuthorizeRequests((requests: AuthorizeRequest[]) => {
      vm.$store.commit(
        AuthModulePerfix + AuthMutationTypes.UPDATE_AUTHORIZE_URLS,
        requests
      );
      resolve();
    });
  });
}

export function loadTransferReqsFromBackground(vm: Vue) {
  return new Promise<void>((resolve) => {
    vm.$messages.subscribeTransferReq((reqs: TransferReq[]) => {
      vm.$store.commit(
        TransferModulePerfix + TransferMutationTypes.UPDATE_TRANSFER_URLS,
        reqs
      );
      resolve();
    });
  });
}

export function loadMultisigsTransactionReqsFormBackground(vm: Vue) {
  return new Promise<void>((resolve) => {
    vm.$messages.subscribeMultisigsTransactionReq(
      (reqs: RawTransactionReq[]) => {
        vm.$store.commit(
          MultisigsModulePerfix +
            MultisigsMutationTypes.UPDATE_MULTISIGS_TRANSACTIONS,
          reqs
        );
        resolve();
      }
    );
  });
}

export function loadPerferenceFromBackground(vm: Vue) {
  return new Promise<void>((resolve) => {
    vm.$messages.subscribePreferenceState((state) => {
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
      vm.$store.commit(
        KeyringModulePerfix + KeyringMutationTypes.UPDATE_KEYRING_STATE,
        state
      );
      resolve();
    });
  });
}

export async function loadWalletData(vm: Vue) {
  const inited = vm.$store.state.keyring.keyring.initialized;
  const locked = !vm.$store.state.keyring.keyring.isUnlocked;
  const selectedAccount = vm.$store.state.preference.preference.seletedAccount;
  if (!inited || locked) {
    return;
  }

  await Promise.all([
    vm.$store.dispatch(WalletModulePerfix + WalletActionTypes.LOAD_ASSETS),
    vm.$store.dispatch(
      WalletModulePerfix + WalletActionTypes.LOAD_EXCHANGE_RATES
    ),
    vm.$store.dispatch(WalletModulePerfix + WalletActionTypes.LOAD_ME, {
      id: selectedAccount
    })
  ]);
}

let timer: any = null;
export async function startWalletTimer(vm: Vue) {
  timer = setInterval(() => {
    loadWalletData(vm);
  }, 3000);
  return timer;
}

export async function init(vm: Vue) {
  vm.$store.commit(AppModulePerfix + AppMutationTypes.SET_INITING, true);

  await loadAuthorizeRequestsFromBackground(vm);
  await loadPerferenceFromBackground(vm);
  await loadKeyringFromBackground(vm);
  await loadTransferReqsFromBackground(vm);
  await loadMultisigsTransactionReqsFormBackground(vm);
  await loadWalletData(vm);
  // startWalletTimer(vm);

  vm.$store.commit(AppModulePerfix + AppMutationTypes.SET_INITING, false);
}
