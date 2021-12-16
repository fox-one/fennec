<template>
  <div>
    <f-loading v-if="loading" :loading="loading" fullscreen />
    <div v-else>
      <address-form :address="address" :asset="meta.asset" />
    </div>
  </div>
</template>

<script lang="ts">
import { GlobalGetters } from "@foxone/fennec-ui/store/types";
import { Address, Asset } from "@foxone/mixin-api/types";
import { Component, Mixins } from "vue-property-decorator";
import PageView from "../../mixin/page";
import AddressForm from "../../components/send/AddressForm.vue";

@Component({
  components: {
    AddressForm
  }
})
class AddressEdit extends Mixins(PageView) {
  loading = false;

  address: Address | null = null;

  get title() {
    return this.$t("address.edit");
  }

  get addressId() {
    return this.$route.query.addressId as string;
  }

  get meta() {
    const getAssetById = this.$store.getters[GlobalGetters.GET_ASSET_BY_ID];
    const asset: Asset | undefined = getAssetById(this.address?.asset_id);
    const symbol = asset?.symbol ?? "";

    return {
      asset,
      symbol
    };
  }

  mounted() {
    this.requestAddress();
  }

  async requestAddress() {
    this.loading = true;

    try {
      this.address = (await this.$endpoints.getWithdrawAddress(
        this.addressId
      )) as Address;
    } catch (error) {
      this.$utils.helper.errorToast(this, error);
    }

    this.loading = false;
  }
}
export default AddressEdit;
</script>
