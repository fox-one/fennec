<template>
  <v-form ref="form" v-model="valid">
    <f-input
      v-model.trim="password"
      label="Create a password for your account"
      type="password"
      :hide-details="false"
      :rules="rules.password"
    />

    <f-input
      v-model.trim="confirmPassword"
      label="Confirm password"
      type="password"
      class="mt-4"
      :hide-details="false"
      :rules="rules.confirmPassword"
    />

    <v-btn
      rounded
      depressed
      min-width="200"
      color="primary"
      class="my-5"
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
    const form = this.$refs.form as any;
    const valid = form.validate();
    if (valid) {
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
