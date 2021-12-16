<template>
  <div>
    <f-button min-width="200" color="primary" @click="handleSelectFile">
      {{ $t("import.keystore") }}
    </f-button>
    <input ref="input" type="file" class="input" @change="handleInputChange" />
    <f-bottom-sheet
      v-model="dialog"
      wapper-in-desktop="dialog"
      :title="$t('confirm.import')"
      :dialog-props="{ maxWidth: 360 }"
    >
      <div class="px-5">
        <div class="label-1">
          {{ $t("name") }}
        </div>
        <div class="mt-2 account-field">
          <span class="mr-2">
            <account-avatar
              :url="profile && profile.avatar_url"
              class="d-flex"
            />
          </span>
          <span>{{ profile && profile.full_name }}</span>
        </div>
        <div class="label-1">
          {{ $t("client.id") }}
        </div>
        <div class="mt-2 account-field">
          {{ keystore && keystore.client_id }}
        </div>
      </div>

      <v-layout justify-space-around class="mt-5">
        <f-button text color="label" @click="handleCancel">
          {{ $t("cancel") }}
        </f-button>

        <f-button text color="primary" @click="handleConfirm">
          {{ $t("import") }}
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
import { User } from "@foxone/mixin-api/types";
import AccountAvatar from "../account/AccountAvatar.vue";

@Component({
  components: {
    AccountAvatar
  }
})
class ImportKeyAction extends Vue {
  keystore: Account | null = null;

  profile: User | null = null;

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

  async handleLoadFile(e) {
    const result = e.target?.result?.toString() ?? "";

    try {
      const keystore = JSON.parse(result);

      if (MixinAccount.checkAccount(keystore)) {
        const endpoints = this.$utils.account.getHttpEndpoints({
          userId: keystore.client_id,
          sessionId: keystore.session_id,
          privateKey: keystore.private_key
        });

        try {
          const profile = await endpoints.getMe();

          this.profile = profile;
          this.keystore = keystore;
          this.dialog = true;
        } catch (error) {
          throw new Error(this.$t("error.cannot.access.keystore") as string);
        }
      } else {
        throw new Error(this.$t("error.keystore.invalid") as string);
      }
    } catch (error) {
      this.$utils.helper.errorToast(this, error);
    }
  }

  handleImportSuccess() {
    this.$router.push({ name: "backup" });
    this.$uikit.toast.success({
      message: this.$t("message.import.successfully") as string
    });
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
  display: flex;
  align-items: center;
  margin-bottom: 16px;
}
</style>
