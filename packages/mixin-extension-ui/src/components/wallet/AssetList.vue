<template>
  <list-wapper :data="meta.assets">
    <v-list>
      <v-list-item
        v-for="(asset, index) in meta.assets"
        :key="index"
        class="pa-0"
      >
        <span class="mr-2">
          <v-img width="28" height="28" :src="asset.icon" />
        </span>
        <v-list-item-content>
          <v-list-item-title>
            <span class="f-body-1">{{ asset.balance }}</span>
            <span class="f-body-2">{{ asset.symbol }}</span>
          </v-list-item-title>
          <v-list-item-subtitle>
            <span class="f-caption text--secondary">{{ asset.amount }}</span>
          </v-list-item-subtitle>
        </v-list-item-content>
        <div class="text-right">
          <div class="f-body-2" :style="{ color: asset.priceChangeColor }">
            {{ asset.priceChange }}
          </div>
          <div class="f-caption text--secondary">{{ asset.price }}</div>
        </div>
      </v-list-item>
    </v-list>
  </list-wapper>
</template>

<script lang="ts">
import { Asset } from "@foxone/mixin-sdk/types";
import { Component, Vue } from "vue-property-decorator";
import ListWapper from "../hoc/ListWarpper.vue";

@Component({
  components: {
    ListWapper
  }
})
class AssetList extends Vue {
  get meta() {
    const assets: Asset[] = this.$store.state.wallet.assets;
    const currencyExchange = this.$utils.currency.currencyExchange;
    const toPercent = this.$utils.number.toPercent;
    const getValueColor = this.$utils.color.getValueColor;

    const assetsMeta = assets.map((asset) => {
      const amount = Number(asset.price_usd) * Number(asset.balance);
      const price = Number(asset.price_usd);
      const priceChange = Number(asset.change_usd);

      const amountFormat = currencyExchange(this, { n: amount });
      const priceFormat = currencyExchange(this, { n: price });
      const priceChangeFormat = toPercent({ n: priceChange, s: true, p: 2 });
      const priceChangeColor = getValueColor(this, priceChange);

      return {
        balance: asset.balance,
        icon: asset.icon_url,
        symbol: asset.symbol,
        amount: amountFormat,
        price: priceFormat,
        priceChange: priceChangeFormat,
        priceChangeColor: priceChangeColor
      };
    });
    return {
      assets: assetsMeta
    };
  }
}
export default AssetList;
</script>
