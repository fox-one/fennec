<template>
  <list-wapper :data="meta.assets">
    <v-list>
      <v-list-item
        v-for="(asset, index) in meta.assets"
        :key="index"
        class="pa-0"
        @click="handleToAssetDetail(asset)"
      >
        <span class="mr-2">
          <f-mixin-asset-logo
            :size="28"
            :logo="asset.icon"
            :chain-logo="getAssetChainLogo(asset)"
          />
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
import { Component, Vue, Prop } from "vue-property-decorator";
import ListWapper from "../hoc/ListWarpper.vue";

@Component({
  components: {
    ListWapper
  }
})
class AssetList extends Vue {
  @Prop() filter!: string;

  get meta() {
    let assets: Asset[] = this.$store.state.wallet.assets;
    assets = assets.filter((x) => {
      const symbol = x.symbol.toLowerCase();
      const name = x.name.toLowerCase();
      const filter = this.filter.toLowerCase();
      return symbol.startsWith(filter) || name.startsWith(filter);
    });
    assets = assets.sort((x, y) => {
      const amountX = Number(x.balance) * Number(x.price_usd);
      const amountY = Number(y.balance) * Number(y.price_usd);
      return amountY - amountX;
    });

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
        id: asset.asset_id,
        chain: asset.chain_id,
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

  getAssetChainLogo(asset) {
    return this.$utils.helper.getChainAssetLogo(this, asset.chain);
  }

  handleToAssetDetail(asset) {
    this.$router.push({ name: "asset-id", params: { id: asset.id } });
  }
}
export default AssetList;
</script>

<style lang="scss" scoped>
::v-deep {
  .f-asset-logo .f-asset-logo__chain--small {
    width: 12px !important;
    height: 12px !important;

    .v-image {
      width: 10px !important;
      height: 10px !important;
    }
  }
}
</style>
