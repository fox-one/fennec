<template>
  <v-btn
    block
    rounded
    depressed
    color="primary"
    class="mt-5"
    @click="handleBackupAll"
  >
    Backup All
  </v-btn>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import JSZip from "jszip";
import FileSaver from "file-saver";
import { MixinAccount } from "@foxone/mixin-sdk/keyring";

@Component
class AccountBackupAll extends Vue {
  loading = false;

  handleBackupAll() {
    this.$utils.account.confirmPassword(this, {
      onSuccess: (password: string) => this.requestExportAllAccounts(password)
    });
  }

  async requestExportAllAccounts(password: string) {
    this.loading = true;
    try {
      const data = await this.$messages.exportAllAccounts(password);
      await this.download(data);
    } catch (error) {
      this.$utils.helper.errorToast(this, error);
    }
    this.loading = false;
  }

  async download(data: string) {
    const accounts = JSON.parse(data);
    const zip = new JSZip();
    accounts.map((x: MixinAccount) =>
      zip.file(`keystore-${x.client_id}.json`, `${JSON.stringify(x)}`)
    );
    zip.generateAsync({ type: "blob" }).then((blob) => {
      FileSaver.saveAs(blob, "keystores.zip");
    });
  }
}
export default AccountBackupAll;
</script>
