<template>
  <v-container>
    <div class="text-center">
      <f-mixin-asset-logo :size="48" :logo="meta.btcIcon" />
      <div>
        <span class="f-headline">{{ meta.totalBTCFormat }}</span>
        <span class="f-body-2">BTC</span>
      </div>
      <div class="f-body-2 text--secondary">{{ meta.totalUSDFormat }}</div>
    </div>
    <asset-actions />
    <v-layout class="mt-3" align-center>
      <v-flex class="mr-4">
        <v-text-field
          v-model="search"
          dense
          solo
          hide-details
          flat
          background-color="transparent"
          placeholder="Search"
          class="f-bg-greyscale-6"
        />
      </v-flex>
      <asset-add />
    </v-layout>
    <asset-list :filter="search" />
  </v-container>
</template>

<script lang="ts">
import { Component, Mixins } from "vue-property-decorator";
import PageView from "../mixin/page";
import { GetterKeys, WalletModuleKey } from "../store/modules/wallet/types";
import AssetActions from "../components/wallet/AssetActions.vue";
import AssetAdd from "../components/wallet/AssetAdd.vue";
import AssetList from "../components/wallet/AssetList.vue";
import { BTC_ASSET_ID } from "../defaults";

@Component({
  components: {
    AssetActions,
    AssetAdd,
    AssetList
  }
})
class HomePage extends Mixins(PageView) {
  search = "";

  get title() {
    return "";
  }

  get appbar() {
    return {
      back: false
    };
  }

  get meta() {
    const getters = this.$store.getters;
    const currencyExchange = this.$utils.currency.currencyExchange;
    const format = this.$utils.number.format;

    const totalUSD = getters[WalletModuleKey + GetterKeys.TOTAL_USD];
    const totalBTC = getters[WalletModuleKey + GetterKeys.TOTAL_BTC];
    const getAssetById = getters[WalletModuleKey + GetterKeys.GET_ASSET_BY_ID];
    const btc = getAssetById(BTC_ASSET_ID);

    const totalUSDFormat = currencyExchange(this, {
      n: totalUSD,
      from: "USD",
      to: "USD"
    });
    const totalBTCFormat = format({ n: totalBTC, mp: 8 });

    return {
      btcIcon: btc?.icon_url ?? "",
      totalUSDFormat,
      totalBTCFormat
    };
  }
}
export default HomePage;
</script>
