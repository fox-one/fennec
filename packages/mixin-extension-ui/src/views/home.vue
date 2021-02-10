<template>
  <v-container>
    <div class="text-center">
      <div class="f-headline">{{ meta.totalBTCFormat }}</div>
      <div class="f-body-2 text--secondary">{{ meta.totalUSDFormat }}</div>
    </div>
    <wallet-tabs />
  </v-container>
</template>

<script lang="ts">
import { Component, Mixins } from "vue-property-decorator";
import PageView from "../mixin/page";
import { GetterKeys, WalletModuleKey } from "../store/modules/wallet/types";
import WalletTabs from "../components/wallet/WalletTabs.vue";

@Component({
  components: {
    WalletTabs
  }
})
class HomePage extends Mixins(PageView) {
  get title() {
    return "Home";
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
