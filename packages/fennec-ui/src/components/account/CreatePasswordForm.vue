<template>
  <v-form v-model="valid" class="form mt-3">
    <f-input
      v-model.trim="password"
      :label="$t('password')"
      type="password"
      autofocus
      :hide-details="false"
      :rules="rules.password"
      class="mb-1"
    />

    <f-input
      v-model.trim="confirmPassword"
      :label="$t('password.confirm')"
      type="password"
      autofocus
      :hide-details="false"
      :rules="rules.confirmPassword"
      class="mb-1"
    />

    <v-layout justify-space-around>
      <f-button text color="label" @click="handleCancel">
        {{ $t("cancel") }}
      </f-button>
      <f-button text :disabled="!valid" color="primary" @click="handleSubmit">
        {{ $t("confirm") }}
      </f-button>
    </v-layout>
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
          v.length >= 6 || this.$t("message.password.letters.least"),
        (v: string) =>
          v.length <= 18 || this.$t("message.password.letters.last")
      ],
      confirmPassword: [
        (v: string) =>
          v === this.password || this.$t("message.password.not.same")
      ]
    };
  }

  handleCancel() {
    this.$emit("cancel");
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
