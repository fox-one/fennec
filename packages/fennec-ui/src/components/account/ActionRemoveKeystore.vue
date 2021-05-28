<template>
  <div>
    <v-btn
      rounded
      block
      depressed
      color="error"
      class="mt-3"
      :loading="loading"
      @click="handleConfirmRemove"
    >
      Remove
    </v-btn>
    <v-dialog v-model="dialog" max-width="600">
      <v-card>
        <v-card-title class="error--text">
          <v-icon color="error" class="mr-1">
            {{ $icons.mdiAlert }}
          </v-icon>
          Warning
        </v-card-title>
        <v-card-text>
          After completing this action, we can't recover you wallet until you
          provide the keystore file. Be sure to save keystore file before
          deleting any account!
          <v-checkbox
            v-model="checkbox"
            hide-details
            dense
            label="I have known the risk"
            :off-icon="$icons.mdiCheckboxBlankCircleOutline"
            :on-icon="$icons.mdiCheckboxMarkedCircle"
          />
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn text @click="handleCancel">Cancel</v-btn>
          <v-btn text color="error" :disabled="!checkbox" @click="handleRemove">
            Delete
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";

@Component
class ActionRemoveKeystore extends Vue {
  @Prop() id!: string;

  loading = false;

  dialog = false;

  checkbox = false;

  @Watch("dialog")
  handleDialogChange() {
    this.checkbox = false;
  }

  handleConfirmRemove() {
    this.dialog = true;
  }

  handleRemove() {
    this.dialog = false;
    this.$utils.account.confirmPassword(this, {
      onSuccess: (password: string) =>
        this.requestRemoveAccount(this.id, password)
    });
  }

  handleCancel() {
    this.dialog = false;
  }

  async requestRemoveAccount(id: string, password: string) {
    this.loading = true;

    try {
      await this.$messages.removeAccount(id, password);
      this.$utils.app.loadWalletData(this);
      this.$emit("completed");
    } catch (error) {
      this.$utils.helper.errorToast(this, error);
    }

    this.loading = false;
  }
}
export default ActionRemoveKeystore;
</script>
