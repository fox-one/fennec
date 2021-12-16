<template>
  <div>
    <address-form :asset="meta.asset" />
  </div>
</template>

<script lang="ts">
import { Component, Mixins } from "vue-property-decorator";
import PageView from "../../mixin/page";
import { Asset } from "@foxone/mixin-api/types";
import { GlobalGetters } from "@foxone/fennec-ui/store/types";
import AddressForm from "../../components/send/AddressForm.vue";

@Component({
  components: {
    AddressForm
  }
})
class AddressCreate extends Mixins(PageView) {
  get title() {
    return this.$t("create.address.symbol", { symbol: this.meta.symbol });
  }

  get assetId() {
    return this.$route.query.assetId as string;
  }

  get meta() {
    const getAssetById = this.$store.getters[GlobalGetters.GET_ASSET_BY_ID];
    const asset: Asset | undefined = getAssetById(this.assetId);
    const symbol = asset?.symbol ?? "";

    return {
      asset,
      symbol
    };
  }
}
export default AddressCreate;
</script>
