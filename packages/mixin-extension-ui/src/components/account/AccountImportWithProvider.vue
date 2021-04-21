<template>
  <f-panel>
    <div class="f-caption">Approach 2</div>
    <div class="text-center">
      <div class="f-body-1 font-weight-bold mt-3">
        Create a mandated account from Account Service Providers
      </div>
      <div class="my-5">
        <account-provider-selector v-model="provider" />
        <f-input v-model="name" label="Wallet Name" class="mt-5" />
        <v-btn
          rounded
          depressed
          min-width="200"
          color="primary"
          class="mt-5"
          :loading="loading"
          :disabled="meta.disabled"
          @click="handleCreate"
        >
          Create Account
        </v-btn>
      </div>
      <div>
        <a :href="href" target="_blank" class="f-caption">
          Important notices about mandated accounts
        </a>
      </div>
    </div>
  </f-panel>
</template>

<script lang="ts">
import { AccountProvider } from "@foxone/mixin-extension-base/state/types";
import { Component, Vue, Prop } from "vue-property-decorator";
import AccountProviderSelector from "./AccountProviderSelector.vue";
import { DOCS_URL } from "../../defaults";

@Component({
  components: {
    AccountProviderSelector
  }
})
class AccountImportWithProvider extends Vue {
  @Prop({ type: Boolean, default: false }) policiesAccepted!: boolean;

  @Prop({ type: Boolean, default: false }) checkPoliciesAccepted!: boolean;

  provider: AccountProvider | null = null;

  loading = false;

  name = "Custom Wallet";

  href = DOCS_URL.MANDATED_ACCOUNT_NOTICE;

  get meta() {
    return {
      disabled: !this.provider || this.loading
    };
  }

  async handleCreate() {
    if (this.checkPoliciesAccepted && !this.policiesAccepted) {
      this.$emit("checkPolicies");
      return;
    }
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
