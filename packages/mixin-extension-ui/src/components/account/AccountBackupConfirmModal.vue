<template>
  <v-dialog v-model="dialog" max-width="600">
    <template #activator="{ on }">
      <v-btn rounded text small block color="error" class="mt-5" v-on="on">
        I have saved keystore files, back to home
      </v-btn>
    </template>
    <v-card>
      <v-card-title class="error--text">
        <v-icon color="error" class="mr-1">
          {{ $icons.mdiAlert }}
        </v-icon>
        Warning
      </v-card-title>
      <v-card-text>
        Make sure you have save your keystore files store safe and private. If
        not you might lost your wallet in unpredicted accident.
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
        <v-btn text color="primary" :disabled="!checkbox" @click="handleNext">
          Next
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
class AccountBackupConfirmModal extends Vue {
  dialog = false;

  checkbox = false;

  handleNext() {
    this.$router.push({ name: "home" });
  }
}
export default AccountBackupConfirmModal;
</script>
