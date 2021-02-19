<template>
  <v-container>
    <v-layout align-center justify-center>
      <span class="mr-3">
        <v-img width="38" height="38" :src="meta.asset.icon_url" />
      </span>
      <div>
        <div class="f-headline">{{ meta.totalBalanceFormat }}</div>
        <div class="f-body-2 text--secondary">{{ meta.totalUSDFormat }}</div>
      </div>
    </v-layout>
    <asset-actions :asset="meta.asset" />
    <activity-list v-if="meta.asset" :asset="meta.asset" />
  </v-container>
</template>

<script lang="ts">
import { Asset } from "@foxone/mixin-sdk/types";
import { Component, Mixins } from "vue-property-decorator";
import PageView from "../../mixin/page";
import AssetActions from "../../components/wallet/AssetActions.vue";
import ActivityList from "../../components/wallet/ActivityList.vue";

@Component({
  components: {
    AssetActions,
    ActivityList
  }
})
class AssetDetail extends Mixins(PageView) {
  get title() {
    return "Detail";
  }

  get id() {
    return this.$route.params.id;
  }

  get meta() {
    const currencyExchange = this.$utils.currency.currencyExchange;
    const format = this.$utils.number.format;

    const assets: Asset[] = this.$store.state.wallet.assets;
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
    const totalBalanceFormat = format({ n: balance, mp: 8 }) + " " + symbol;

    return {
      totalBalanceFormat,
      totalUSDFormat,
      asset
    };
  }
}
export default AssetDetail;
</script>
