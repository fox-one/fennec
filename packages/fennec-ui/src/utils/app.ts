import { AuthorizeRequest } from "@foxone/fennec-base/state/auth";
import {
  RawTransactionReq,
  TransferReq
} from "@foxone/fennec-base/state/wallet";
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
import { EVENTS } from "../defaults";

export async function loadAuthorizeRequestsFromBackground(
  vm: Vue
): Promise<boolean> {
  return vm.$messages.subscribeAuthorizeRequests(
    (requests: AuthorizeRequest[]) => {
      vm.$store.commit(
        AuthModulePerfix + AuthMutationTypes.UPDATE_AUTHORIZE_URLS,
        requests
      );
    }
  );
}

export function loadTransferReqsFromBackground(vm: Vue): Promise<boolean> {
  return vm.$messages.subscribeTransferReq((reqs: TransferReq[]) => {
    vm.$store.commit(
      TransferModulePerfix + TransferMutationTypes.UPDATE_TRANSFER_URLS,
      reqs
    );
  });
}

export function loadMultisigsTransactionReqsFormBackground(
  vm: Vue
): Promise<boolean> {
  return vm.$messages.subscribeMultisigsTransactionReq(
    (reqs: RawTransactionReq[]) => {
      vm.$store.commit(
        MultisigsModulePerfix +
          MultisigsMutationTypes.UPDATE_MULTISIGS_TRANSACTIONS,
        reqs
      );
    }
  );
}

export function loadPreferenceFromBackground(vm: Vue): Promise<boolean> {
  return vm.$messages.subscribePreferenceState((state) => {
    vm.$store.commit(
      PreferenceModulePerfix + PreferenceMutationTypes.UPDATE_PREFRENCE,
      state
    );
  });
}

export function loadKeyringFromBackground(vm: Vue): Promise<boolean> {
  return vm.$messages.subscribeKeyingState((state) => {
    vm.$store.commit(
      KeyringModulePerfix + KeyringMutationTypes.UPDATE_KEYRING_STATE,
      state
    );
  });
}

export async function loadWalletData(vm: Vue): Promise<void> {
  const inited = vm.$store.state.keyring.keyring.initialized;
  const locked = !vm.$store.state.keyring.keyring.isUnlocked;
  const selectedAccount = vm.$store.state.preference.preference.seletedAccount;

  if (!inited || locked) return;

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

let timer: any;

export function startWalletTimer(vm: Vue): number | undefined {
  const inited = vm.$store.state.keyring.keyring.initialized;
  const locked = !vm.$store.state.keyring.keyring.isUnlocked;

  if (!inited || locked) return;

  timer = setInterval(() => {
    loadWalletData(vm).then(
      () => {
        // ignore
      },
      () => {
        // ignore
      }
    );
  }, 3000);

  return timer;
}

export function handleError(vm: Vue, error: Error): void {
  vm.$root.$emit(EVENTS.APPLICATION_ERROR, error);
}

export async function init(vm: Vue): Promise<void> {
  vm.$store.commit(AppModulePerfix + AppMutationTypes.SET_INITING, true);

  console.log("initing");

  try {
    await loadAuthorizeRequestsFromBackground(vm);
    await loadPreferenceFromBackground(vm);
    await loadKeyringFromBackground(vm);
    await loadTransferReqsFromBackground(vm);
    await loadMultisigsTransactionReqsFormBackground(vm);
    await loadWalletData(vm);

    console.log("inited");
    startWalletTimer(vm);
  } catch (error) {
    handleError(vm, error);
  }

  vm.$store.commit(AppModulePerfix + AppMutationTypes.SET_INITING, false);
}
