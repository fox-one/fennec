<template>
  <div class="asset-balance" :class="classes">
    <asset-information-modal :asset="asset">
      <template #activator="{ on }">
        <asset-logo :size="32" :asset="asset" @click.native="on.click" />
      </template>
    </asset-information-modal>

    <v-flex class="amount">
      <div>
        <span class="title-1">{{ meta.balanceText }}</span>
        <span class="font-weight-bold text-3">{{ meta.symbol }}</span>
      </div>
      <div class="label-1 mt-2">≈ {{ meta.fiatText }}</div>
    </v-flex>
  </div>
</template>

<script lang="ts">
import { Asset } from "@foxone/mixin-api/types";
import { Component, Vue, Prop } from "vue-property-decorator";
import AssetLogo from "./AssetLogo.vue";
import AssetInformationModal from "./AssetInformationModal.vue";

@Component({
  components: {
    AssetLogo,
    AssetInformationModal
  }
})
class AssetDetailAmount extends Vue {
  @Prop() asset!: Asset;

  get classes() {
    const smAndDown = this.$vuetify.breakpoint.smAndDown;

    return { "asset-balance--popup": smAndDown };
  }

  get meta() {
    const { format } = this.$utils.number;
    const { toFiat } = this.$utils.currency;

    const asset = this.asset;
    const balance = asset?.balance ?? "0";
    const priceUsd = asset?.price_usd ?? "0";
    const symbol = asset?.symbol ?? "";
    const logo = asset?.icon_url ?? "";
    const balanceText = format({ n: balance, dp: 8 });
    const fiatText = toFiat(this, { n: +balance * +priceUsd });

    return {
      logo,
      priceUsd,
      symbol,
      balance,
      balanceText,
      fiatText
    };
  }
}
export default AssetDetailAmount;
</script>

<style lang="scss" scoped>
.asset-balance {
  display: flex;
  align-items: center;

  .amount {
    margin-left: 16px;
    line-height: 1;
  }

  .asset-icon {
    align-self: flex-start;
  }

  &--popup {
    flex-direction: column;

    .asset-icon {
      align-self: center;
    }

    .amount {
      text-align: center;
      line-height: 1;
      margin-top: 12px;
      margin-left: 0;
    }
  }
}
</style>
