<template>
  <div>
    <div class="label-1">
      {{ $t("addresses") }}
    </div>

    <div class="mt-3">
      <f-loading v-if="loading" />
      <div v-else>
        <address-item
          v-for="(address, index) in addresses"
          :key="index"
          :address="address"
          @reload="requestAddresses"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Address } from "@foxone/mixin-api/types";
import { Component, Vue, Prop } from "vue-property-decorator";
import AddressItem from "./AddressItem.vue";

@Component({
  components: {
    AddressItem
  }
})
class AddressList extends Vue {
  @Prop() assetId!: string;

  loading = false;

  addresses: Address[] = [];

  mounted() {
    this.requestAddresses();
  }

  async requestAddresses() {
    this.loading = true;

    try {
      this.addresses = await this.$endpoints.getAssetWithdrawAddresses(
        this.assetId
      );
    } catch (error) {
      this.$utils.helper.errorToast(this, error);
    }

    this.loading = false;
  }
}
export default AddressList;
</script>
