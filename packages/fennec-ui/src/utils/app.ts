import { AuthorizeRequest } from "@foxone/fennec-base/state/auth";
import {
  RawTransactionReq,
  TransferReq
} from "@foxone/fennec-base/state/wallet";
import { GlobalMutations, GlobalActions } from "../store/types";
import { EVENTS } from "../defaults";
import { useGuard } from "../router/guard";

export async function loadAuthorizeRequestsFromBackground(
  vm: Vue
): Promise<boolean> {
  return vm.$messages.subscribeAuthorizeRequests(
    (requests: AuthorizeRequest[]) => {
      vm.$store.commit(GlobalMutations.SET_AUTHORIZE_REQUESTS, requests);
    }
  );
}

export function loadTransferReqsFromBackground(vm: Vue): Promise<boolean> {
  return vm.$messages.subscribeTransferReq((reqs: TransferReq[]) => {
    vm.$store.commit(GlobalMutations.SET_TRANSFER_REQUESTS, reqs);
  });
}

export function loadMultisigsTransactionReqsFormBackground(
  vm: Vue
): Promise<boolean> {
  return vm.$messages.subscribeMultisigsTransactionReq(
    (reqs: RawTransactionReq[]) => {
      vm.$store.commit(GlobalMutations.SET_TRANSACTION_REQUESTS, reqs);
    }
  );
}

export function loadPreferenceFromBackground(vm: Vue): Promise<boolean> {
  return vm.$messages.subscribePreferenceState((state) => {
    vm.$store.commit(GlobalMutations.SET_PREFERENCE, state);
  });
}

export function loadKeyringFromBackground(vm: Vue): Promise<boolean> {
  return vm.$messages.subscribeKeyingState((state) => {
    vm.$store.commit(GlobalMutations.SET_KEYRING, state);
  });
}

export function resetWalletData(vm: Vue) {
  vm.$store.commit(GlobalMutations.RESET_WALLET);
  vm.$store.commit(GlobalMutations.RESET_PROFILES);
}

export function resetApplicationData(vm: Vue) {
  resetWalletData(vm);
  vm.$store.commit(GlobalMutations.RESET_PAGE_STATE);
  vm.$store.commit(GlobalMutations.RESET_APP);
}

export async function loadWalletData(vm: Vue, refresh = false): Promise<void> {
  try {
    const inited = vm.$store.state.keyring.keyring.initialized;
    const locked = !vm.$store.state.keyring.keyring.isUnlocked;
    const selectedAccount =
      vm.$store.state.preference.preference.selectedAccount;

    if (!inited || locked || !selectedAccount) {
      resetWalletData(vm);

      return;
    }

    startWalletTimer(vm);

    await Promise.all([
      !refresh && vm.$utils.account.loadAccounts(vm),
      vm.$store.dispatch(GlobalActions.LOAD_ASSETS),
      vm.$store.dispatch(GlobalActions.LOAD_EXCHANGE_RATES),
      vm.$store.dispatch(GlobalActions.LOAD_ME, { id: selectedAccount })
    ]);
  } catch (error) {
    vm.$utils.helper.errorToast(vm, error);

    console.log(error);
  }
}

let timer: any;

export function startWalletTimer(vm: Vue) {
  const inited = vm.$store.state.keyring.keyring.initialized;
  const locked = !vm.$store.state.keyring.keyring.isUnlocked;

  if (!inited || locked) return;

  clearInterval(timer);

  timer = setInterval(() => {
    loadWalletData(vm, true);
  }, 15000);
}

export function handleError(vm: Vue, error: Error | unknown): void {
  vm.$root.$emit(EVENTS.APPLICATION_ERROR, error);
}

export function hasReactions(vm: Vue) {
  const keyring = vm.$store.state.keyring.keyring;
  const inited = keyring.initialized;
  const isUnlocked = keyring.isUnlocked;
  const hasAuthRequest = vm.$store.state.auth.authorizeRequests.length > 0;
  const hasTransferReq = vm.$store.state.transfer.transferRequests.length > 0;
  const hasMultisigsTransactionReq =
    vm.$store.state.multisigs.transactionRequests.length > 0;

  return (
    inited &&
    isUnlocked &&
    (hasAuthRequest || hasTransferReq || hasMultisigsTransactionReq)
  );
}

export async function init(vm: Vue): Promise<void> {
  vm.$store.commit(GlobalMutations.SET_INITING, true);

  try {
    await loadAuthorizeRequestsFromBackground(vm);
    await loadPreferenceFromBackground(vm);
    await loadKeyringFromBackground(vm);
    await loadTransferReqsFromBackground(vm);
    await loadMultisigsTransactionReqsFormBackground(vm);
    await loadWalletData(vm);
  } catch (error) {
    handleError(vm, error);
  }

  useGuard(vm);

  vm.$store.commit(GlobalMutations.SET_INITING, false);
}
