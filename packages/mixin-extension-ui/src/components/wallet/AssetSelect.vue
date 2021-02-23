<template>
  <f-bottom-sheet v-model="dialog">
    <template #activator="{ on }">
      <f-list-item
        v-on="on"
        :title="meta.symbol"
        class="asset-select f-bg-greyscale-6"
      >
        <template #head>
          <f-loading v-if="loading" size="28" />
          <v-icon v-else-if="!meta.icon">
            {{ $icons.mdiHelpCircle }}
          </v-icon>
          <v-img v-else width="32" height="32" :src="meta.icon" />
        </template>
      </f-list-item>
    </template>
    <template #title> Select asset </template>
    <template #subheader>
      <f-input v-model="search" label="Search" />
    </template>
    <list-wapper :data="filterAssets">
      <v-list>
        <v-list-item
          v-for="(asset, index) in filterAssets"
          :key="index"
          @click="handleSelect(asset)"
        >
          <f-mixin-asset-logo
            :size="32"
            :logo="asset.icon_url"
            :chain-logo="getAssetChainLogo(asset)"
            class="mr-5"
          />
          <v-list-title>
            {{ asset.symbol }}
          </v-list-title>
        </v-list-item>
      </v-list>
    </list-wapper>
  </f-bottom-sheet>
</template>

<script lang="ts">
import { Asset } from "@foxone/mixin-sdk/types";
import { Component, Model, Vue } from "vue-property-decorator";
import ListWapper from "../common/ListWarpper.vue";

@Component({
  components: {
    ListWapper
  }
})
class AssetSelect extends Vue {
  @Model("change") value!: Asset | null;

  dialog = false;

  loading = false;

  search = "";

  get assets(): Asset[] {
    const assets: Asset[] = this.$store.state.wallet.assets;
    return assets.sort((x, y) => {
      const amountX = Number(x.balance) * Number(x.price_usd);
      const amountY = Number(y.balance) * Number(y.price_usd);
      return amountY - amountX;
    });
  }

  get filterAssets() {
    return this.assets.filter((x) => {
      const symbol = x.symbol.toLowerCase();
      const name = x.name.toLowerCase();
      const search = this.search.toLowerCase();
      return symbol.startsWith(search) || name.startsWith(search);
    });
  }

  get meta() {
    return {
      symbol: this.value?.symbol ?? "Select asset",
      icon: this.value?.icon_url
    };
  }

  async handleSelect(asset: Asset) {
    this.dialog = false;
    if (asset.destination) {
      this.$emit("change", asset);
      return;
    }

    this.loading = true;
    try {
      const res = await this.$endpoints.getAsset(asset.asset_id);
      this.$emit("change", res);
    } catch (error) {
      this.$utils.helper.errorToast(this, error);
    }
    this.loading = false;
  }

  getAssetChainLogo(asset) {
    return this.$utils.helper.getChainAssetLogo(this, asset.chain_id);
  }
}
export default AssetSelect;
</script>

<style lang="scss" scoped>
.asset-select {
  border-radius: 5px;

  &::before {
    display: none;
  }
}

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
