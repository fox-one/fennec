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
        :key="index"
        :id="account"
      >
        <template #action>
          <action-backup-keystore :id="account">
            <template #activator="{ on, loading }">
              <v-btn
                icon
                depressed
                x-small
                color="primary"
                v-on="on"
                :loading="loading"
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

    <v-btn
      rounded
      text
      small
      block
      color="error"
      class="mt-5"
      @click="handleToHome"
    >
      I have saved keystore files, back to home
    </v-btn>
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

  get appbar() {
    return {
      back: false
    };
  }

  get meta() {
    const keyring: KeyringMemState = this.$store.state.keyring.keyring;
    const preference: PerferenceStore = this.$store.state.preference.preference;
    const selectedAccount = preference.seletedAccount;
    return { selectedAccount, accounts: keyring.accounts };
  }

  handleToHome() {
    this.$router.push({ name: "home" });
  }
}
export default BackUpPage;
</script>
