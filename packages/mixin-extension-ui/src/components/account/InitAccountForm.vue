<template>
  <v-form ref="form">
    <f-input
      v-show="useInput"
      v-model="keystore"
      textarea
      rows="2"
      label="Keystore"
      :rules="rules.configs"
    />
    <import-session-form v-show="!useInput" @select="handleSelectFile" />
    <v-layout class="mt-1">
      <v-spacer />
      <v-btn
        v-if="!useInput"
        text
        small
        color="primary"
        @click="useInput = true"
      >
        Use Input
      </v-btn>
      <v-btn v-else text small color="primary" @click="useInput = false">
        Select From File
      </v-btn>
    </v-layout>

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
import MixinKeyring from "@foxone/mixin-sdk/keyring";
import { Component, Vue } from "vue-property-decorator";
import ImportSessionForm from "./ImportSessionFromJson.vue";

@Component({
  components: {
    ImportSessionForm
  }
})
class InitAccountForm extends Vue {
  password = "";

  confirmPassword = "";

  keystore = "";

  useInput = false;

  loading = false;

  get rules() {
    return {
      keystore: [
        (v: string) => !!v || "Keystore is required",
        (v: string) => {
          try {
            return (
              MixinKeyring.checkAccount(JSON.parse(v)) ||
              "Sessions is not valid"
            );
          } catch (error) {
            return "Sessions is not valid";
          }
        }
      ],
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

  get valid() {
    return (
      this.keystore &&
      this.password &&
      this.confirmPassword &&
      this.password === this.confirmPassword
    );
  }

  handleSelectFile(text: string) {
    this.keystore = text;
  }

  handleSubmit() {
    const form = this.$refs.form as any;
    const valid = form.validate();
    if (valid) {
      this.requestAddNewAccount();
    }
  }

  async requestAddNewAccount() {
    this.loading = true;
    try {
      await this.$messages.createNewAccount(this.keystore, this.password);
      this.$emit("completed");
    } catch (error) {
      this.$utils.helper.errorToast(this, error);
    }
    this.loading = false;
  }
}
export default InitAccountForm;
</script>
