<template>
  <select-field
    :value="value"
    :disabled="!asset"
    v-bind="$attrs"
    @clear="handleClear"
    @click.native="handleClick"
  >
    <div>
      <div v-if="!!id">
        {{ address && address.label }}
      </div>
      <div v-else class="label-1">
        {{ $t("select.from.address") }}
      </div>
    </div>
  </select-field>
</template>

<script lang="ts">
import { Address, Asset } from "@foxone/mixin-api/types";
import { Component, Vue, Prop, Watch, PropSync } from "vue-property-decorator";
import AddressItem from "./AddressItem.vue";
import SelectField from "../common/SelectField";

@Component({
  components: {
    AddressItem,
    SelectField
  }
})
class AddressField extends Vue {
  @PropSync("id") bindId!: string;

  @Prop() asset!: Asset | undefined;

  @PropSync("address") bindAddress;

  get value() {
    return this.bindAddress?.address_id;
  }

  @Watch("id", { immediate: true })
  handleAddressChange() {
    this.requestAddress();
  }

  handleClear() {
    this.bindId = "";
  }

  async requestAddress() {
    if (!this.bindId) {
      this.bindAddress = null;

      return;
    }

    try {
      this.bindAddress = await this.$endpoints.getWithdrawAddress(this.bindId);
    } catch (error) {
      this.$utils.helper.errorToast(this, error);
    }
  }

  handleClick() {
    this.$router.push({
      name: "address-select",
      query: { assetId: this.asset?.asset_id ?? "" }
    });
  }
}
export default AddressField;
</script>

<style lang="scss" scoped>
.label-1 {
  font-size: 16px;
}
</style>
