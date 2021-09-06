<template>
  <v-dialog v-model="dialog" max-width="328">
    <template #activator="{ on }">
      <slot name="activator" :on="on" :loading="loading">
        <f-button
          depressed
          rounded
          outlined
          color="error"
          min-width="240"
          v-on="on"
        >
          Reset Application
        </f-button>
      </slot>
    </template>

    <v-card>
      <v-card-title class="text-center error--text title-2">
        Are you sure you want to reset application?
      </v-card-title>

      <v-card-text class="label-1 mt-4">
        You must know what you are to do. This action will clear all the
        personal data in this merchine includes keystore files.
        <br />
        Make sure you have a effective backup, otherwise you might lose your
        wallet!

        <check-box-field :value.sync="checkbox" class="mx-n4 mt-3">
          <template #label>
            <div class="text-1">I have known the risk</div>
          </template>
        </check-box-field>
      </v-card-text>

      <v-card-actions class="justify-space-around">
        <f-button text @click="handleCancel">Cancel</f-button>
        <f-button
          text
          color="error"
          :loading="loading"
          :disabled="!checkbox"
          @click="handleResetApplication"
        >
          Reset
        </f-button>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
class ActionResetApplication extends Vue {
  dialog = false;

  checkbox = false;

  loading = false;

  handleCancel() {
    this.dialog = false;
  }

  async handleResetApplication() {
    this.loading = true;

    try {
      await this.$messages.resetApplication();
      this.$utils.app.resetApplicationData(this);

      this.$router.push({ name: "account-init" });
      window.location.reload();
    } catch (error) {
      this.$utils.helper.errorToast(this, error);
    }

    this.loading = false;
  }
}
export default ActionResetApplication;
</script>
