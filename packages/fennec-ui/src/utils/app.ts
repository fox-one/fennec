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
      // TODO: recover
      // vm.$store.commit(GlobalMutations.SET_TRANSACTION_REQUESTS, [
      //   {
      //     id: "1639735731210.13",
      //     payload: {
      //       type: "payment",
      //       trace_id: "43e13492-e1c7-493c-b409-893032b5da51",
      //       asset_id: "31d2ea9c-95eb-3355-b65b-ba096853bc18",
      //       amount: "1",
      //       threshold: 4,
      //       receivers: [
      //         "5278fff7-a084-4019-b963-a7a88559d5c4",
      //         "ab14736f-e595-4e65-9879-871819d390f5",
      //         "8d6fb2ef-9ffb-4d9f-8e10-255a32116194",
      //         "b7eaf2bf-207a-42c6-bc96-7731b00e6feb",
      //         "afa1eb9d-4a6f-44d6-a9f1-05b87c2438b8",
      //         "b7f12976-02c2-4c74-8704-f3e648e33a29"
      //       ],
      //       memo: "GNz+p1wFs9ySFJmDIINO91xovyYqh2yuZbKlXtQFkrlZEuw1zbZOkgoi8DvrwwrtReVrV1g/OH58LF4+yzODAA==",
      //       created_at: "2021-12-17T10:08:50.176542638Z",
      //       status: "pending",
      //       code_id: "997a4de0-0d2d-4789-b400-88418fcb6ece"
      //     }
      //   }
      // ]);
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
  }, 5000);
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
