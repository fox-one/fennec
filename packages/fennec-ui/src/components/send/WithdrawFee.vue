<template>
  <warning v-if="meta.show">
    <div>
      {{
        `A transaction fee of ${meta.fee} ${meta.feeAssetSymbol} is required for withdrawing ${meta.symbol}`
      }}
    </div>
  </warning>
</template>

<script lang="ts">
import { Address, Asset } from "@foxone/mixin-api/types";
import { GlobalGetters } from "../../store/types";
import { Component, Vue, Prop } from "vue-property-decorator";

@Component
class WithdrawFee extends Vue {
  @Prop() address!: Address | null;

  @Prop() asset!: Asset | null;

  get meta() {
    const getAssetById = this.$store.getters[GlobalGetters.GET_ASSET_BY_ID];

    const symbol = this.asset?.symbol ?? "";
    const fee = this.address?.fee ?? "";
    const feeAsset = getAssetById(this.asset?.chain_id ?? "");
    const feeAssetSymbol = feeAsset?.symbol ?? "";
    const show = this.address && this.asset;

    return { fee, symbol, show, feeAssetSymbol };
  }
}
export default WithdrawFee;
</script>
