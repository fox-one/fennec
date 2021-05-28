<template>
  <v-container>
    <f-tip type="error" class="rounded">
      <span>Notice:</span>
      <br />
      Keystore file is the <span class="font-weight-bold">ONLY</span> way to
      access your assets in Mixin Network.
      <br />
      Please backup your keystore file and keep it safe.
    </f-tip>

    <f-panel class="pa-0 mt-5">
      <account-item
        v-for="(account, index) in meta.accounts"
        :id="account"
        :key="index"
      >
        <template #action>
          <action-backup-keystore :id="account">
            <template #activator="{ on, loading }">
              <v-btn
                icon
                depressed
                x-small
                color="primary"
                :loading="loading"
                v-on="on"
              >
                <v-icon>
                  {{ $icons.mdiDownloadOutline }}
                </v-icon>
              </v-btn>
            </template>
          </action-backup-keystore>
        </template>
      </account-item>
    </f-panel>

    <action-backup-all-keystore />

    <account-backup-confirm-modal />
  </v-container>
</template>

<script lang="ts">
import { Component, Mixins } from "vue-property-decorator";
import PageView from "../mixin/page";
import { KeyringMemState } from "@foxone/fennec-base/state/keyring";
import { PreferenceStore } from "@foxone/fennec-base/state/types";
import AccountItem from "../components/account/AccountItem.vue";
import ActionBackupKeystore from "../components/account/ActionBackupKeystore.vue";
import ActionBackupAllKeystore from "../components/account/ActionBackupAllKeystore.vue";
import AccountBackupConfirmModal from "../components/account/AccountBackupConfirmModal.vue";

@Component({
  components: {
    AccountItem,
    ActionBackupKeystore,
    ActionBackupAllKeystore,
    AccountBackupConfirmModal
  }
})
class BackUpPage extends Mixins(PageView) {
  get title() {
    return "BackUp";
  }

  get appbar() {
    return {
      back: false
    };
  }

  get meta() {
    const keyring: KeyringMemState = this.$store.state.keyring.keyring;
    const preference: PreferenceStore = this.$store.state.preference.preference;
    const selectedAccount = preference.seletedAccount;

    return { selectedAccount, accounts: keyring.accounts };
  }
}
export default BackUpPage;
</script>
