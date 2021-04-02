<template>
  <f-list>
    <account-item
      v-for="(item, index) in meta.accounts"
      :key="index"
      :id="item"
      class="pa-0"
      @click.native="handleClick(item)"
    />

    <v-btn
      rounded
      block
      depressed
      outlined
      color="primary"
      class="mt-6"
      @click="handleImport"
    >
      Import
    </v-btn>
    <v-btn
      rounded
      block
      depressed
      color="primary"
      class="mt-3"
      @click="handleToBackup"
    >
      Backup
    </v-btn>

    <f-bottom-sheet v-model="dialog">
      <template #title> {{ meta.currentUserName }} </template>
      <template #subheader>
        <div class="text-center">
          {{ currentAccount }}
        </div>
      </template>
      <div class="pa-5">
        <action-back-up-keystore :id="currentAccount" />
        <action-select-keystore
          :id="currentAccount"
          @completed="handleSelected"
        />
        <action-remove-keystore
          :id="currentAccount"
          @completed="handleRemoved"
        />
      </div>
    </f-bottom-sheet>
  </f-list>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { KeyringMemState } from "@foxone/mixin-extension-base/state/keyring";
import { PerferenceStore } from "@foxone/mixin-extension-base/state/types";
import AccountItem from "./AccountItem.vue";
import ActionBackUpKeystore from "./ActionBackupKeystore.vue";
import ActionSelectKeystore from "./ActionSelectKeystore.vue";
import ActionRemoveKeystore from "./ActionRemoveKeystore.vue";
import { User } from "@foxone/mixin-sdk/types";

@Component({
  components: {
    AccountItem,
    ActionBackUpKeystore,
    ActionSelectKeystore,
    ActionRemoveKeystore
  }
})
class AccountList extends Vue {
  loading = false;

  dialog = false;

  currentAccount: Account | null = null;

  user: User | null = null;

  get meta() {
    const keyring: KeyringMemState = this.$store.state.keyring.keyring;
    const preference: PerferenceStore = this.$store.state.preference.preference;
    const selectedAccount = preference.seletedAccount;
    const currentUserName = this.user?.full_name ?? "";
    return { selectedAccount, accounts: keyring.accounts, currentUserName };
  }

  @Watch("currentAccount")
  handleCurrentAccountChange(value: string) {
    this.requestAccount(value);
  }

  handleImport() {
    this.$router.push({ name: "import" });
  }

  handleSelected() {
    this.dialog = false;
  }

  handleRemoved() {
    this.dialog = false;
  }

  handleClick(account: Account) {
    this.currentAccount = account;
    this.dialog = true;
  }

  handleToBackup() {
    this.$router.push({ name: "backup" });
  }

  async requestAccount(id: string) {
    try {
      this.user = await this.$utils.account.getUser(this, id);
    } catch (error) {
      this.$utils.helper.errorToast(this, error);
    }
  }
}
export default AccountList;
</script>
