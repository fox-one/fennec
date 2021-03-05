<template>
  <v-form v-model="valid" class="form">
    <f-input
      v-model.trim="password"
      label="your password"
      type="password"
      class="text--center"
      :rules="rules.password"
    />

    <v-btn
      rounded
      depressed
      min-width="200"
      color="primary"
      class="mt-10"
      :loading="loading"
      :disabled="!valid"
      @click="handleSubmit"
    >
      {{ label || "Unlock" }}
    </v-btn>
  </v-form>
</template>

<script lang="ts">
import { Component, Prop, Mixins } from "vue-property-decorator";
import PageView from "../../mixin/page";

@Component
class EnterPasswordForm extends Mixins(PageView) {
  @Prop() label!: string;

  loading = false;

  valid = false;

  password = "";

  get rules() {
    return {
      password: [(v) => !!v || "password is required"]
    };
  }

  handleSubmit() {
    if (this.valid) {
      this.tryUnlockKeyring();
    }
  }

  async tryUnlockKeyring() {
    this.loading = true;
    try {
      await this.$messages.tryUnlockKeyring(this.password);
      this.$emit("completed", this.password);
    } catch (error) {
      this.$emit("failed");
      this.$utils.helper.errorToast(this, error);
    }
    this.loading = false;
  }
}
export default EnterPasswordForm;
</script>

<style scoped>
.form {
  text-align: center;
}
</style>
