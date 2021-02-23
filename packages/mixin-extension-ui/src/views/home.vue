<template>
  <v-container>
    <div class="text-center">
      <div class="f-headline">{{ meta.totalBTCFormat }}</div>
      <div class="f-body-2 text--secondary">{{ meta.totalUSDFormat }}</div>
    </div>
    <asset-actions />
    <v-layout class="mt-3" align-center>
      <v-flex class="mr-4">
        <f-input v-model="search" label="Search" />
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

    const totalUSDFormat = currencyExchange(this, {
      n: totalUSD,
      from: "USD",
      to: "USD"
    });
    const totalBTCFormat = format({ n: totalBTC, mp: 8 }) + " BTC";

    return {
      totalUSDFormat,
      totalBTCFormat
    };
  }
}
export default HomePage;
</script>
