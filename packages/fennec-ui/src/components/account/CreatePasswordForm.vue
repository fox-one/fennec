<template>
  <v-form v-model="valid" class="form">
    <f-input
      v-model.trim="password"
      label="Password"
      type="password"
      :hide-details="false"
      :rules="rules.password"
      class="mt-10"
    />

    <f-input
      v-model.trim="confirmPassword"
      label="Confirm password"
      type="password"
      :hide-details="false"
      :rules="rules.confirmPassword"
    />

    <v-btn
      rounded
      depressed
      min-width="200"
      color="primary"
      class="mt-10"
      :disabled="!valid"
      @click="handleSubmit"
    >
      Create
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
      this.$emit("completed", this.password);
    }
  }
}
export default CreatePasswordForm;
</script>

<style lang="scss" scoped>
.form {
  text-align: center;
}
</style>
