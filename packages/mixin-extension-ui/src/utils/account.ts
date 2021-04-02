import { ActionTypes, WalletModulePerfix } from "../store/modules/wallet/types";

export async function selectAccount(vm: Vue, id: string) {
  const selectedAccount = vm.$store.state.preference.preference.selectedAccount;
  if (id === selectedAccount) {
    return;
  }
  await vm.$messages.selectAccount(id);
  vm.$utils.app.loadWalletData(vm);
}

export async function getUser(vm: Vue, id: string) {
  return await vm.$store.dispatch(WalletModulePerfix + ActionTypes.LOAD_USER, {
    id
  });
}
