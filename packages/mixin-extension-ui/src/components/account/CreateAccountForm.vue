<template>
  <v-form ref="form" v-model="valid">
    <f-input
      v-model="configs"
      textarea
      type=""
      rows="2"
      label="Provide your Mixin account sessions"
      :rules="rules.configs"
      :hide-details="false"
    />

    <div class="subtitle-2 my-5">Or import session from json file</div>
    <import-session-form @select="handleSelectFile" />

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
import MixinKeyring from "@foxone/mixin-sdk/keyring";
import ImportSessionForm from "./ImportSessionFromJson.vue";

@Component({
  components: {
    ImportSessionForm
  }
})
class ImportMixinAccountSession extends Vue {
  configs = "";

  valid = false;

  loading = false;

  get rules() {
    return {
      configs: [
        (v) => !!v || "Sessions is required",
        (v) => {
          try {
            return (
              MixinKeyring.checkAccount(JSON.parse(v)) ||
              "Sessions is not valid"
            );
          } catch (error) {
            return "Sessions is not valid";
          }
        }
      ]
    };
  }

  handleSubmit() {
    const form = this.$refs.form as any;
    const valid = form.validate();
    if (valid) {
      this.requestAddNewAccount();
    }
  }

  handleSelectFile(text: string) {
    this.configs = text;
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
