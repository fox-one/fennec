<template>
  <v-form v-model="valid">
    <v-text-field
      v-model.trim="password"
      outlined
      label="your password"
      type="password"
      :rules="rules.password"
    />
    <v-btn
      block
      text
      color="primary"
      :loading="loading"
      :disabled="!valid"
      @click="handleSubmit"
    >
      {{ label || "Unlock" }}
    </v-btn>
  </v-form>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component
class EnterPasswordForm extends Vue {
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
