<template>
  <div>
    <f-button min-width="200" color="primary" @click="handleSelectFile">
      Import keystore
    </f-button>
    <input ref="input" type="file" class="input" @change="handleInputChange" />
    <f-bottom-sheet
      v-model="dialog"
      title="Confirm Import?"
      wapper-in-desktop="dialog"
      :dialog-props="{ maxWidth: 360 }"
    >
      <div class="px-5">
        <div class="label-1">Client ID</div>
        <div class="mt-2 account-field">
          {{ keystore && keystore.client_id }}
        </div>
      </div>

      <v-layout justify-space-around class="mt-5">
        <f-button text color="label" @click="handleCancel"> Cancel </f-button>

        <f-button text color="primary" @click="handleConfirm">
          Import
        </f-button>
      </v-layout>
    </f-bottom-sheet>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import MixinAccount, {
  MixinAccount as Account
} from "@foxone/mixin-api/keyring";

@Component
class ImportKeyAction extends Vue {
  keystore: Account | null = null;

  dialog = false;

  importing = false;

  get input(): any {
    return this.$refs.input;
  }

  @Watch("dialog")
  handleDialogChange(value) {
    if (!value) {
      this.keystore = null;
    }
  }

  handleConfirm() {
    this.$utils.account.confirmPassword(this, {
      onSuccess: (password: string) => this.requestImportAccount(password)
    });
  }

  handleSelectFile() {
    this.input.click();
  }

  handleInputChange(e) {
    const file = e.target.files[0];

    if (!file) return;
    const reader = new FileReader();

    reader.onload = (e) => this.handleLoadFile(e);
    reader.readAsText(file);
  }

  handleLoadFile(e) {
    const result = e.target?.result?.toString() ?? "";

    try {
      const keystore = JSON.parse(result);

      if (MixinAccount.checkAccount(keystore)) {
        this.keystore = keystore;
        this.dialog = true;
      } else {
        throw new Error("Keystore file is not valid");
      }
    } catch (error) {
      this.$utils.helper.errorToast(this, error);
    }
  }

  handleImportSuccess() {
    this.$router.push({ name: "backup" });
    this.$uikit.toast.success({ message: "Import Successfully" });
  }

  handleCancel() {
    (this.$refs.input as any).value = "";
    this.keystore = null;
    this.dialog = false;
  }

  async requestImportAccount(password: string) {
    this.importing = true;

    try {
      const keystore = JSON.stringify(this.keystore);

      await this.$messages.createNewAccount(keystore, password);
      this.handleImportSuccess();
    } catch (error) {
      this.$utils.helper.errorToast(this, error);
    }

    this.importing = false;
  }
}
export default ImportKeyAction;
</script>

<style lang="scss" scoped>
.input {
  visibility: hidden;
  height: 0;
  width: 0;
}

.account-field {
  word-break: break-all;
  font-size: 14px;
}
</style>
