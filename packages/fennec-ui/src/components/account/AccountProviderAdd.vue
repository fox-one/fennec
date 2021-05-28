<template>
  <v-dialog v-model="dialog" max-width="600">
    <template #activator="{ on }">
      <v-btn block depressed rounded color="primary" v-on="on">
        Add Custom Provider
      </v-btn>
    </template>
    <v-card class="pa-3">
      <v-card-title class="justify-center"> Custom Provider </v-card-title>
      <v-card-text class="px-0">
        <f-tip type="warning" class="mb-5">
          Make sure your provider is reliable, otherwise you might suffer
          unpredictable loss.
        </f-tip>
        <f-input v-model="provider" label="Provider Address" />
      </v-card-text>
      <v-card-actions>
        <v-btn
          block
          rounded
          depressed
          color="primary"
          :loading="loading"
          :disabled="!provider"
          @click="handleAdd"
        >
          Submit
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { PreferenceStore } from "@foxone/fennec-base/state/types";

@Component
class AccountProviderAdd extends Vue {
  dialog = false;

  loading = false;

  provider = "";

  @Watch("dialog")
  handleDialogChange() {
    this.provider = "";
  }

  async handleAdd() {
    this.loading = true;
    const preference: PreferenceStore = this.$store.state.preference.preference;
    const providers = preference.accountProviders;

    try {
      await this.$messages.updateAccountProviders([
        ...providers,
        { type: "custom", value: this.provider }
      ]);
      this.dialog = false;
    } catch (error) {
      this.$utils.helper.errorToast(this, error);
    }

    this.loading = false;
  }
}
export default AccountProviderAdd;
</script>
