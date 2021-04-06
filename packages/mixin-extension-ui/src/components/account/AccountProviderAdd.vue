<template>
  <v-dialog v-model="dialog">
    <template #activator="{ on }">
      <v-btn block depressed rounded color="primary" v-on="on">
        Add Customer Provider
      </v-btn>
    </template>
    <v-card class="pa-3">
      <v-card-title class="justify-center"> Customer Provider </v-card-title>
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
import { Component, Vue } from "vue-property-decorator";
import { PerferenceStore } from "@foxone/mixin-extension-base/state/types";

@Component
class AccountProviderAdd extends Vue {
  dialog = false;

  loading = false;

  provider = "";

  async handleAdd() {
    this.loading = true;
    const preference: PerferenceStore = this.$store.state.preference.preference;
    const providers = preference.accountProviders;
    try {
      await this.$messages.updateAccountProviders([
        ...providers,
        { type: "customer", value: this.provider }
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
