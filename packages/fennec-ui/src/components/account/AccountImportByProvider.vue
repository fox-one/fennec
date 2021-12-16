<template>
  <v-form v-model="valid">
    <input-field :label="$t('host.provider')">
      <account-provider-field v-model="provider" />
    </input-field>

    <input-field :label="$t('wallet.name')" class="mt-8">
      <f-input
        v-model="name"
        :placeholder="$t('wallet.name')"
        :rules="rules.name"
      />
    </input-field>

    <paragraph-item
      :title="$t('import.by.provider.notice.title')"
      :text="$t('import.by.provider.notice.text')"
    />

    <div class="text-center mt-8">
      <f-button
        min-width="200"
        color="primary"
        :loading="loading"
        :disabled="meta.disabled"
        @click="handleCreate"
      >
        {{ $t("account.create") }}
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
      name: [(v) => !!v || this.$t("message.wallet.name.require")]
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
