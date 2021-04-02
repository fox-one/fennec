export async function selectAccount(vm: Vue, id: string) {
  const selectedAccount = vm.$store.state.preference.preference.selectedAccount;
  if (id === selectedAccount) {
    return;
  }
  await vm.$messages.selectAccount(id);
  vm.$utils.app.loadWalletData(vm);
}
