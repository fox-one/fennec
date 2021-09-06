<template>
  <div>
    <slot
      name="activator"
      :on="{ click: handleConfirmRemove }"
      :loading="loading"
    >
      <f-button
        rounded
        block
        depressed
        color="error"
        class="mt-3"
        :loading="loading"
        @click="handleConfirmRemove"
      >
        Remove
      </f-button>
    </slot>

    <v-dialog v-model="dialog" max-width="328">
      <v-card>
        <v-card-title class="text-center error--text title-2">
          Are you sure you want to remove the account?
        </v-card-title>

        <v-card-text class="label-1 mt-4">
          After completing this action, we
          <span class="error--text text-uppercase">can't recover</span> you
          wallet until you provide the keystore file. Be sure to save keystore
          file before deleting any account!

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
            @click="handleRemove"
          >
            Remove
          </f-button>
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
