<template>
  <div class="pa-4 bg_card rounded address-item" @click="handleSelect">
    <v-layout class="font-weight-bold">
      <v-flex>{{ meta.label }}</v-flex>
      <span>
        <v-btn small icon class="mr-2" @click.stop="handleToEdit">
          <v-icon>$IconEdit</v-icon>
        </v-btn>

        <v-btn
          :loading="deleting"
          small
          icon
          color="error"
          @click="handleRemove"
        >
          <v-icon>$IconRemove</v-icon>
        </v-btn>
      </span>
    </v-layout>
    <div class="label-1 mt-4 address-text">{{ meta.text }}</div>
  </div>
</template>

<script lang="ts">
import { Address } from "@foxone/mixin-api/types";
import { Component, Vue, Prop } from "vue-property-decorator";
import { Sync } from "vuex-pathify";

@Component
class AddressItem extends Vue {
  @Sync("page/send@withdrawForm") form;

  @Prop() address!: Address;

  deleting = false;

  get meta() {
    const { destination, label, tag } = this.address;
    let text = destination;

    if (tag) {
      text = `${tag}:${destination}`;
    }

    return { text, label };
  }

  handleToEdit() {
    this.$router.push({
      name: "address-edit",
      query: { addressId: this.address?.address_id }
    });
  }

  handleRemove() {
    this.$utils.account.confirmPassword(this, {
      onSuccess: (password: string) => {
        this.requestDeleteAddress(password);
      }
    });
  }

  handleSelect() {
    this.form.address_id = this.address.address_id;
    this.$router.back();
  }

  async requestDeleteAddress(password: string) {
    this.deleting = true;

    try {
      const pin = await this.$messages.getEncryptedPin(password);

      await this.$endpoints.deleteWithdrawAddress(this.address.address_id, {
        pin
      });

      if (this.form.address_id === this.address.address_id) {
        this.form.address_id = "";
      }

      this.$uikit.toast.success({ message: "Deleted Successfully" });
      this.$emit("reload");
    } catch (error) {
      this.$utils.helper.errorToast(this, error);
    }

    this.deleting = false;
  }
}
export default AddressItem;
</script>

<style lang="scss" scoped>
.address-item {
  margin-bottom: 16px;
  cursor: pointer;

  .address-text {
    word-break: break-all;
  }
}
</style>
