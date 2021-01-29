<template>
  <v-form v-model="valid">
    <v-textarea
      v-model="configs"
      outlined
      auto-grow
      rows="2"
      label="Provide your Mixin account sessions"
    />
    <v-btn
      block
      text
      color="primary"
      :disabled="!valid"
      :loading="loading"
      @click="handleSubmit"
    >
      Next
    </v-btn>
  </v-form>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
class ImportMixinAccountSession extends Vue {
  configs = "";

  valid = false;

  loading = false;

  handleSubmit() {
    if (this.valid) {
      this.requestAddNewAccount();
    }
  }

  async requestAddNewAccount() {
    this.loading = true;
    try {
      await this.$messages.createNewAccount(this.configs);
      this.$emit("completed");
    } catch (error) {
      this.$utils.helper.errorToast(this, error);
    }
    this.loading = false;
  }
}
export default ImportMixinAccountSession;
</script>
