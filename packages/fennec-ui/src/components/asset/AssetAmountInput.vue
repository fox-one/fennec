<template>
  <div>
    <f-asset-amount-input
      :value="value"
      :asset.sync="bindAsset"
      :assets="meta.items"
      v-bind="$attrs"
      v-on="$listeners"
    >
      <template #tools>
        <f-asset-input-tools
          :wallet-connected="true"
          :balance="meta.balance"
          :fiat-amount="meta.fiatAmountText"
          @fill="handleFill"
        >
        </f-asset-input-tools>
      </template>
    </f-asset-amount-input>
  </div>
</template>

<script lang="ts">
import { Asset } from "@foxone/mixin-api/types";
import { Component, Model, PropSync, Vue } from "vue-property-decorator";
import { GlobalGetters } from "../../store//types";

@Component({
  inheritAttrs: false
})
class AssetAmountInput extends Vue {
  @PropSync("asset") bindAsset!: Asset | null;

  @Model("input") value!: string;

  get meta() {
    const { toFiat } = this.$utils.currency;
    const getters = this.$store.getters;
    const getAsset = getters[GlobalGetters.GET_ASSET_BY_ID];
    const getBalance = (id) => getAsset(id)?.balance ?? 0;

    let assets: Asset[] = getters[GlobalGetters.GET_MERGED_ASSETS];

    assets = assets.sort((x, y) => {
      const amountX = Number(x.balance) * Number(x.price_usd);
      const amountY = Number(y.balance) * Number(y.price_usd);

      return amountY - amountX;
    });

    const balance = getBalance(this.bindAsset?.asset_id);
    const priceUsd = this.bindAsset?.price_usd ?? 0;
    const value = this.value ?? 0;
    const fiatAmount = +value * +priceUsd;
    const fiatAmountText = toFiat(this, { n: fiatAmount });

    const items = assets.map((x) => {
      return this.$utils.asset.convertToListAsset(this, x);
    });

    return {
      items,
      assets,
      balance,
      fiatAmountText
    };
  }

  handleFill() {
    this.$emit("input", this.meta.balance);
  }
}
export default AssetAmountInput;
</script>
