<template>
  <v-form v-model="valid">
    <input-field :label="$t('provider.address')">
      <v-textarea
        v-model="provider"
        filled
        :placeholder="$t('input')"
        :rules="rules.value"
      />
    </input-field>

    <div class="text-center mt-8">
      <f-button
        color="primary"
        :disabled="!valid"
        :min-width="200"
        @click="handleSubmit"
      >
        {{ $t("submit") }}
      </f-button>
    </div>
  </v-form>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { PreferenceStore } from "@foxone/fennec-base/state/types";

@Component
class AccountProviderForm extends Vue {
  @Prop({ type: String, default: "" }) value!: string;

  valid = false;

  loading = false;

  provider = "";

  get rules() {
    return {
      value: [(v) => !!v || this.$t("message.provider.url.require")]
    };
  }

  get meta() {
    const preference: PreferenceStore = this.$store.state.preference.preference;
    const providers = preference.accountProviders;
    const current = providers.find((x) => x.value === this.value);

    return { providers, canRemove: current && current.type === "custom" };
  }

  mounted() {
    this.provider = this.value;
  }

  handleSubmit() {
    if (this.value) {
      this.handleEdit();
    } else {
      this.handleAdd();
    }
  }

  async handleEdit() {
    this.loading = true;

    try {
      const providers = this.meta.providers;
      const index = providers.findIndex((x) => x.value === this.value);

      Vue.set(providers, index, { type: "custom", value: this.provider });
      await this.$messages.updateAccountProviders(providers);

      this.$uikit.toast.success({
        message: this.$t("message.edit.provider.successfully") as string
      });
      this.$router.back();
    } catch (error) {
      this.$utils.helper.errorToast(this, error);
    }

    this.loading = false;
  }

  async handleAdd() {
    this.loading = true;

    try {
      await this.$messages.updateAccountProviders([
        ...this.meta.providers,
        { type: "custom", value: this.provider }
      ]);

      this.$uikit.toast.success({
        message: this.$t("message.add.provider.successfully") as string
      });
      this.$router.back();
    } catch (error) {
      this.$utils.helper.errorToast(this, error);
    }

    this.loading = false;
  }
}
export default AccountProviderForm;
</script>
