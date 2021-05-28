<template>
  <div class="text-left">
    <v-list>
      <v-list-item
        v-for="(account, index) in meta.accounts"
        :key="index"
        class="pa-0"
      >
        <v-list-item-content>
          <v-list-item-title>
            {{ account }}
          </v-list-item-title>
          <v-list-item-subtitle> Account {{ index + 1 }} </v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action>
          <v-btn text small color="primary" @click="handleBackUp(account)">
            <v-icon small class="mr-2">
              {{ $icons.mdiDownload }}
            </v-icon>
            BackUp
          </v-btn>
        </v-list-item-action>
      </v-list-item>
    </v-list>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import type { KeyringMemState } from "@foxone/fennec-base/state/keyring";

@Component
class BackUpKeyring extends Vue {
  get meta() {
    const keyring: KeyringMemState = this.$store.state.keyring.keyring;
    const accounts = keyring.accounts;

    return {
      accounts
    };
  }

  handleBackUp(account: string) {
    this.$utils.account.confirmPassword(this, {
      onSuccess: (password: string) =>
        this.requestExportAccount(password, account)
    });
  }

  async requestExportAccount(password: string, account: string) {
    try {
      const exportedJson = await this.$messages.exportAccount(
        account,
        password
      );
      const element = document.createElement("a");

      element.href = `data:text/plain;charset=utf-8,${exportedJson}`;
      element.download = `${account}_exported_account_${Date.now()}.json`;
      element.click();
    } catch (error) {
      this.$utils.helper.errorToast(this, error);
    }
  }
}
export default BackUpKeyring;
</script>
