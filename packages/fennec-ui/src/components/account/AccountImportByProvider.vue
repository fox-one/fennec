<template>
  <v-form v-model="valid">
    <input-field label="Host Provider">
      <account-provider-field v-model="provider" />
    </input-field>

    <input-field label="Wallet Name" class="mt-8">
      <f-input v-model="name" placeholder="Wallet Name" :rules="rules.name" />
    </input-field>

    <paragraph-item
      title="Important notices about mandated accounts"
      text="After you have created an account using the account service provider, please be sure to set a strong password and backup the keystore you just created to a safe place. If you lost your keystore, Fennec won't be able to help you recover it. You will forever lose the access to your assets."
    />

    <div class="text-center mt-8">
      <f-button
        min-width="200"
        color="primary"
        :loading="loading"
        :disabled="meta.disabled"
        @click="handleCreate"
      >
        Create Account
      </f-button>
    </div>
  </v-form>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import AccountProviderField from "./AccountProviderField.vue";
import { Get } from "vuex-pathify";

@Component({
  components: {
    AccountProviderField
  }
})
class AccountImportWithProvider extends Vue {
  @Get("app/settings@provider") provider!: string;

  valid = false;

  loading = false;

  name = "My Wallet";

  get meta() {
    return {
      disabled: !this.provider || !this.valid
    };
  }

  get rules() {
    return {
      name: [(v) => !!v || "Please give a default name for your wallet"]
    };
  }

  handleCreate() {
    this.$utils.account.confirmPassword(this, {
      onSuccess: (password: string) => this.requestCreateAccount(password)
    });
  }

  async requestCreateAccount(password: string) {
    if (!this.provider) return;
    this.loading = true;

    try {
      await this.$utils.account.createAccountFromProvider(this, password, {
        provider: this.provider,
        walletName: this.name,
        cipherType: "ed25519"
      });
      this.handleImportSuccess();
    } catch (error) {
      this.$utils.helper.errorToast(this, error);
    }

    this.loading = false;
  }

  handleImportSuccess() {
    this.$router.push({ name: "backup" });
  }
}
export default AccountImportWithProvider;
</script>
