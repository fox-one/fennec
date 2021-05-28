<template>
  <v-dialog v-model="dialog" max-width="600">
    <template #activator="{ on }">
      <v-btn rounded outlined block color="error" class="mt-5" v-on="on">
        I have saved keystore files
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
        This is so important that we thought it's not too much to emphasize once
        again:
        <br />
        <br />
        Please make sure you have saved your keystore files to somewhere safe
        and private. If not, you might lose access to your assets. And there is
        absolutely NO WAY to recover.
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
              I confirm I'm aware and have kept the keystore files safe
            </span>
          </template>
        </v-checkbox>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn text @click="handleCancel"> Cancel </v-btn>
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

  handleCancel() {
    this.dialog = false;
  }
}
export default AccountBackupConfirmModal;
</script>
