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
    <v-dialog v-model="dialog">
      <v-card>
        <v-card-title>
          <span class="error--text"> Are you sure to delete? </span>
        </v-card-title>
        <v-card-text>
          Make sure to save keystore file before delete the account!!!
          <v-checkbox
            v-model="checkbox"
            hide-details
            dense
            label="I have known all risk"
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
import { Component, Vue, Prop } from "vue-property-decorator";
import { EVENTS } from "../../defaults";

@Component
class ActionRemoveKeystore extends Vue {
  @Prop() id!: string;

  loading = false;

  dialog = false;

  checkbox = false;

  handleConfirmRemove() {
    this.dialog = true;
  }

  handleRemove() {
    this.dialog = false;
    this.$root.$emit(EVENTS.CONFIRM_PASSWORD, {
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
      this.$emit("completed");
    } catch (error) {
      this.$utils.helper.errorToast(this, error);
    }
    this.loading = false;
  }
}
export default ActionRemoveKeystore;
</script>
