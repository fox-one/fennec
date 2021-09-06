<template>
  <v-form v-model="valid">
    <input-field label="Provider Address">
      <v-textarea
        v-model="provider"
        filled
        placeholder="Input..."
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
        Submit
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
      value: [(v) => !!v || "Provider URL is required"]
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

      this.$uikit.toast.success({ message: "Edit Provider Successfully" });
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

      this.$uikit.toast.success({ message: "Add Provider Successfully" });
      this.$router.back();
    } catch (error) {
      this.$utils.helper.errorToast(this, error);
    }

    this.loading = false;
  }
}
export default AccountProviderForm;
</script>
