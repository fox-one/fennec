<template>
  <div>
    <asset-table-actions :search.sync="filter" />
    <asset-list :items="items" :filter="filter" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { GlobalGetters } from "../../store/types";
import { Asset } from "@foxone/mixin-api/types";
import AssetTableActions from "./AssetTableActions.vue";
import AssetList from "./AssetList.vue";

export type TableItem = {
  id: string;
  chain: string;
  balance: string;
  icon: string;
  symbol: string;
  amount: string;
  price: string;
  priceChange: string;
} & Asset;

@Component({
  components: {
    AssetTableActions,
    AssetList
  }
})
class AssetTable extends Vue {
  filter = "";

  get meta() {
    let assets: Asset[] = this.$store.getters[GlobalGetters.GET_MERGED_ASSETS];

    assets = assets.filter((x) => {
      const symbol = x.symbol.toLowerCase();
      const name = x.name.toLowerCase();
      const filter = this.filter?.toLowerCase() ?? "";

      return symbol.startsWith(filter) || name.startsWith(filter);
    });

    assets = assets.sort((x, y) => {
      const amountX = Number(x.balance) * Number(x.price_usd);
      const amountY = Number(y.balance) * Number(y.price_usd);

      return amountY - amountX;
    });

    return {
      assets
    };
  }

  get items(): TableItem[] {
    const toFiat = this.$utils.currency.toFiat;

    return this.meta.assets.map((asset) => {
      const amount = Number(asset.price_usd) * Number(asset.balance);
      const price = Number(asset.price_usd);
      const amountText = toFiat(this, { n: amount });
      const priceText = toFiat(this, { n: price });

      return {
        ...asset,
        id: asset.asset_id,
        chain: asset.chain_id,
        balance: asset.balance,
        icon: asset.icon_url,
        symbol: asset.symbol,
        amount: amountText,
        price: priceText,
        priceChange: asset.change_usd
      };
    });
  }
}
export default AssetTable;
</script>
