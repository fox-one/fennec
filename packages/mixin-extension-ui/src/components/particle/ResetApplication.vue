<template>
  <v-dialog v-model="dialog" max-width="600">
    <template #activator="{ on }">
      <slot name="activator" :on="on">
        <v-btn
          depressed
          rounded
          outlined
          color="error"
          min-width="200"
          v-on="on"
        >
          Reset Application
        </v-btn>
      </slot>
    </template>
    <v-card>
      <v-card-title class="error--text">
        <v-icon color="error" class="mr-1">
          {{ $icons.mdiAlert }}
        </v-icon>
        Warning
      </v-card-title>
      <v-card-text>
        You must know what you are to do. This action will clear all the
        personal data in this merchine includes keystore files.
        <br />
        Make sure you have a effective backup, otherwise you might lose your
        wallet!
        <v-checkbox
          v-model="checkbox"
          hide-details
          dense
          color="error"
          :off-icon="$icons.mdiCheckboxBlankCircleOutline"
          :on-icon="$icons.mdiCheckboxMarkedCircle"
        >
          <template #label>
            <span class="error--text">
              I'm sure to have kept these keystores safe
            </span>
          </template>
        </v-checkbox>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn
          text
          color="primary"
          :loading="loading"
          :disabled="!checkbox"
          @click="handleResetApplication"
        >
          Next
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
class ResetApplication extends Vue {
  dialog = false;

  checkbox = false;

  loading = false;

  async handleResetApplication() {
    this.$utils.account.confirmPassword(this, {
      onSuccess: (password: string) => this.requestResetApplication(password)
    });
  }

  async requestResetApplication(password: string) {
    this.loading = true;
    try {
      await this.$messages.resetApplication(password);
    } catch (error) {
      this.$utils.helper.errorToast(this, error);
    }
    this.loading = false;
  }
}
export default ResetApplication;
</script>
