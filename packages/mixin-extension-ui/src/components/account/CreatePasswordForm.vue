<template>
  <v-form v-model="valid">
    <v-text-field
      v-model.trim="password"
      outlined
      label="Create a password for your account"
      type="password"
      :rules="rules.password"
    />
    <v-text-field
      v-model.trim="confirmPassword"
      outlined
      label="Confirm password"
      type="password"
      class="mt-4"
      :rules="rules.confirmPassword"
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
class CreatePasswordForm extends Vue {
  password = "";

  confirmPassword = "";

  valid = false;

  loading = false;

  get rules() {
    return {
      password: [
        (v: string) =>
          v.length >= 6 || "password should has at least 6 letters",
        (v: string) =>
          v.length <= 18 || "password should has at last 18 letters"
      ],
      confirmPassword: [
        (v: string) => v === this.password || "password is not the same"
      ]
    };
  }

  handleSubmit() {
    if (this.valid) {
      this.requestInitializePassword();
    }
  }

  async requestInitializePassword() {
    this.loading = true;
    try {
      await this.$messages.initializePassword(this.password);
      this.$emit("completed");
    } catch (error) {
      this.$utils.helper.errorToast(this, error);
    }
    this.loading = false;
  }
}
export default CreatePasswordForm;
</script>
