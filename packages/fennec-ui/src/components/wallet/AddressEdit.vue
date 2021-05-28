<template>
  <f-bottom-sheet v-model="dialog">
    <template #activator="{ on }">
      <v-icon small class="ml-1" @click.stop v-on="on">
        {{ $icons.mdiSquareEditOutline }}
      </v-icon>
    </template>
    <template #title> Edit Address </template>
    <div v-if="dialog" class="pa-5">
      <address-form
        :asset="asset"
        :address="address"
        @completed="handleCompleted"
      />
      <v-btn
        outlined
        block
        rounded
        color="error"
        class="mt-2"
        :loading="deleting"
        @click="handleDelete"
      >
        Delete
      </v-btn>
    </div>
  </f-bottom-sheet>
</template>

<script lang="ts">
import { Address, Asset } from "@foxone/mixin-api/types";
import { Component, Vue, Prop } from "vue-property-decorator";
import AddressForm from "./AddressForm.vue";

@Component({
  components: {
    AddressForm
  }
})
class AddressEdit extends Vue {
  @Prop() asset!: Asset | null;

  @Prop() address!: Address;

  dialog = false;

  deleting = false;

  handleCompleted() {
    this.dialog = false;
    this.$emit("reload");
  }

  handleDelete() {
    this.$utils.account.confirmPassword(this, {
      onSuccess: (password: string) => {
        this.requestDeleteAddress(password);
      }
    });
  }

  async requestDeleteAddress(password: string) {
    this.deleting = true;

    try {
      const pin = await this.$messages.getEncryptedPin(password);

      await this.$endpoints.deleteWithdrawAddress(this.address.address_id, {
        pin
      });
      this.dialog = false;
      this.$emit("reload");
    } catch (error) {
      this.$utils.helper.errorToast(this, error);
    }

    this.deleting = false;
  }
}
export default AddressEdit;
</script>
