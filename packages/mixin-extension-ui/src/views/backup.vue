<template>
  <v-container>
    <f-tip type="error">
      <span class="font-weight-bold">Notice:</span>
      <br />
      Keystore file is the only way to access your assets in mixin network.
      <br />
      Please backup your keystore file and keep it safe.
    </f-tip>
    <f-panel class="mt-5 pa-0">
      <account-item
        v-for="(account, index) in meta.accounts"
        :key="index"
        :id="account"
      >
        <template #action>
          <action-backup-keystore :id="account">
            <template #activator="{ on, loading }">
              <v-btn
                rounded
                depressed
                small
                color="primary"
                v-on="on"
                :loading="loading"
              >
                Backup
              </v-btn>
            </template>
          </action-backup-keystore>
        </template>
      </account-item>
    </f-panel>
    <action-backup-all-keystore />
  </v-container>
</template>

<script lang="ts">
import { Component, Mixins } from "vue-property-decorator";
import PageView from "../mixin/page";
import { KeyringMemState } from "@foxone/mixin-extension-base/state/keyring";
import { PerferenceStore } from "@foxone/mixin-extension-base/state/types";
import AccountItem from "../components/account/AccountItem.vue";
import ActionBackupKeystore from "../components/account/ActionBackupKeystore.vue";
import ActionBackupAllKeystore from "../components/account/ActionBackupAllKeystore.vue";

@Component({
  components: {
    AccountItem,
    ActionBackupKeystore,
    ActionBackupAllKeystore
  }
})
class BackUpPage extends Mixins(PageView) {
  get title() {
    return "BackUp";
  }

  get meta() {
    const keyring: KeyringMemState = this.$store.state.keyring.keyring;
    const preference: PerferenceStore = this.$store.state.preference.preference;
    const selectedAccount = preference.seletedAccount;
    return { selectedAccount, accounts: keyring.accounts };
  }
}
export default BackUpPage;
</script>
