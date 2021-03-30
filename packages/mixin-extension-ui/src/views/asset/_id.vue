<template>
  <v-container class="pa-0">
    <f-panel elevation="none" class="rounded-0">
      <v-layout align-center justify-center column>
        <span>
          <f-mixin-asset-logo
            :size="48"
            :logo="meta.icon"
            :chain-logo="meta.chainLogo"
          />
        </span>

        <div>
          <span class="f-headline">{{ meta.totalBalanceFormat }}</span>
          <span class="f-body-2">{{ meta.symbol }}</span>
        </div>
        <div class="f-body-2 text--secondary">{{ meta.totalUSDFormat }}</div>
      </v-layout>
      <asset-actions :asset="meta.asset" />
    </f-panel>

    <div class="pa-2">
      <f-panel class="pa-2">
        <activity-list v-if="meta.asset" :asset="meta.asset" />
      </f-panel>
    </div>
  </v-container>
</template>

<script lang="ts">
import { Asset } from "@foxone/mixin-sdk/types";
import { Component, Mixins } from "vue-property-decorator";
import PageView from "../../mixin/page";
import AssetActions from "../../components/wallet/AssetActions.vue";
import ActivityList from "../../components/wallet/ActivityList.vue";
import {
  WalletModulePerfix,
  GetterKeys
} from "../../store/modules/wallet/types";

@Component({
  components: {
    AssetActions,
    ActivityList
  }
})
class AssetDetail extends Mixins(PageView) {
  get title() {
    return "Asset";
  }

  get id() {
    return this.$route.params.id;
  }

  get meta() {
    const currencyExchange = this.$utils.currency.currencyExchange;
    const format = this.$utils.number.format;

    const assets: Asset[] = this.$store.getters[
      WalletModulePerfix + GetterKeys.GET_MERGED_ASSETS
    ];
    const asset = assets.find((x) => x.asset_id === this.id);

    const balance = Number(asset?.balance) ?? 0;
    const priceUSD = Number(asset?.price_usd) ?? 0;
    const symbol = asset?.symbol ?? "";

    const totalUSD = balance * priceUSD;
    const totalUSDFormat = currencyExchange(this, {
      n: totalUSD,
      from: "USD",
      to: "USD"
    });
    const totalBalanceFormat = format({ n: balance, mp: 8 });
    const icon = asset?.icon_url ?? "";
    const chainLogo = this.$utils.helper.getChainAssetLogo(
      this,
      asset?.chain_id ?? ""
    );

    return {
      totalBalanceFormat,
      totalUSDFormat,
      symbol,
      asset,
      chainLogo,
      icon
    };
  }
}
export default AssetDetail;
</script>
