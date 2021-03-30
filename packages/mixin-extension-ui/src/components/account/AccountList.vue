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

    <f-bottom-sheet v-model="dialog">
      <template #title> Account Actions </template>
      <template #subheader>
        <div class="text-center">
          {{ currentAccount }}
        </div>
      </template>
      <div class="pa-5">
        <v-btn rounded block depressed color="primary"> Backup </v-btn>
        <v-btn rounded block depressed color="primary" class="mt-3">
          Select
        </v-btn>
        <v-btn rounded block depressed color="error" class="mt-3">
          Remove
        </v-btn>
      </div>
      <!-- <f-list>
        <f-list-item title="Backup" />
        <f-list-item title="Select" />
        <f-list-item title="Remove" />
      </f-list> -->
    </f-bottom-sheet>
  </f-list>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { KeyringMemState } from "@foxone/mixin-extension-base/state/keyring";
import { PerferenceStore } from "@foxone/mixin-extension-base/state/types";
import AccountItem from "./AccountItem.vue";
import ActionBackUp from "./ActionBackup.vue";

@Component({
  components: {
    AccountItem,
    ActionBackUp
  }
})
class AccountList extends Vue {
  loading = false;

  dialog = false;

  currentAccount: Account | null = null;

  get meta() {
    const keyring: KeyringMemState = this.$store.state.keyring.keyring;
    const preference: PerferenceStore = this.$store.state.preference.preference;
    const selectedAccount = preference.seletedAccount;
    return { selectedAccount, accounts: keyring.accounts };
  }

  handleImport() {
    this.$router.push({ name: "import" });
  }

  handleClick(account: Account) {
    this.currentAccount = account;
    this.dialog = true;
  }
}
export default AccountList;
</script>
