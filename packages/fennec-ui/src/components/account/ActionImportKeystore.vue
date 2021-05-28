<template>
  <div>
    <v-btn
      rounded
      depressed
      min-width="200"
      color="primary"
      :disabled="checkPoliciesAccepted && !policiesAccepted"
      @click="handleSelectFile"
    >
      Import keystore
    </v-btn>
    <input ref="input" type="file" class="input" @change="handleInputChange" />
    <f-bottom-sheet v-model="dialog">
      <template #title> Confirm Import? </template>
      <account-item v-if="keystore" :id="keystore.client_id">
        <template #action>
          <div></div>
        </template>
      </account-item>
      <div class="pa-5">
        <v-btn block depressed rounded color="primary" @click="handleConfirm">
          Import
        </v-btn>
        <v-btn
          block
          outlined
          depressed
          rounded
          color="error"
          class="mt-3"
          @click="handleCancel"
        >
          Cancel
        </v-btn>
      </div>
    </f-bottom-sheet>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch, Prop } from "vue-property-decorator";
import MixinAccount, {
  MixinAccount as Account
} from "@foxone/mixin-api/keyring";
import AccountItem from "../account/AccountItem.vue";

@Component({
  components: {
    AccountItem
  }
})
class ImportKeyAction extends Vue {
  @Prop({ type: Boolean, default: false }) policiesAccepted!: boolean;

  @Prop({ type: Boolean, default: false }) checkPoliciesAccepted!: boolean;

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
    if (this.checkPoliciesAccepted && !this.policiesAccepted) {
      this.$emit("checkPolicies");

      return;
    }

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
  }

  handleCancel() {
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
</style>
