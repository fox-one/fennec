<template>
  <div>
    <home-appbar />
    <f-panel elevation="none" class="rounded-0">
      <div class="text-center">
        <f-mixin-asset-logo :size="48" :logo="meta.btcIcon" />
        <div>
          <span class="f-headline">{{ meta.totalBTCFormat }}</span>
          <span class="f-body-2">BTC</span>
        </div>
        <div class="f-body-2 text--secondary">{{ meta.totalUSDFormat }}</div>
      </div>
      <asset-actions />
    </f-panel>
    <v-container>
      <v-layout align-center class="mb-2 caption text--secondary actions">
        <v-flex>Assets</v-flex>
        <asset-search v-model="search" />
        <asset-add class="ml-1" />
      </v-layout>
      <div class="pt-0">
        <f-panel class="pa-2 px-0">
          <asset-list :filter="search" />
        </f-panel>
      </div>
    </v-container>
  </div>
</template>

<script lang="ts">
import { Component, Mixins } from "vue-property-decorator";
import PageView from "../mixin/page";
import { GetterKeys, WalletModulePerfix } from "../store/modules/wallet/types";
import AssetActions from "../components/wallet/AssetActions.vue";
import AssetAdd from "../components/wallet/AssetAdd.vue";
import AssetList from "../components/wallet/AssetList.vue";
import AssetSearch from "../components/wallet/AssetSearch.vue";
import HomeAppbar from "../components/particle/HomeAppbar.vue";
import { BTC_ASSET_ID } from "../defaults";

@Component({
  components: {
    AssetActions,
    AssetAdd,
    AssetList,
    AssetSearch,
    HomeAppbar
  }
})
class HomePage extends Mixins(PageView) {
  search = "";

  get title() {
    return "";
  }

  get appbar() {
    return {
      back: false,
      show: false
    };
  }

  get meta() {
    const getters = this.$store.getters;
    const currencyExchange = this.$utils.currency.currencyExchange;
    const format = this.$utils.number.format;

    const totalUSD = getters[WalletModulePerfix + GetterKeys.TOTAL_USD];
    const totalBTC = getters[WalletModulePerfix + GetterKeys.TOTAL_BTC];
    const getAssetById =
      getters[WalletModulePerfix + GetterKeys.GET_ASSET_BY_ID];
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

<style lang="scss" scoped>
.actions {
  min-height: 38px;
}
</style>
