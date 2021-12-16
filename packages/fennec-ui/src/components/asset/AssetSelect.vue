<template>
  <f-bottom-sheet v-model="dialog" :title="title" :hide-close-icon="!title">
    <template #activator="{ on }">
      <asset-select-field :asset="value" @click.native="on.click" />
    </template>

    <asset-search :search.sync="search" transparent class="asset-search" />

    <div class="asset-list">
      <f-list-item
        v-for="(asset, index) in filterAssets"
        :key="index"
        :title="asset.symbol"
        :subtitle="asset.name"
        @click="handleSelect(asset)"
      >
        <template #head>
          <asset-logo :size="24" :asset="asset" />
        </template>
        <template #tail>
          <span></span>
        </template>
      </f-list-item>

      <asset-empty :items="filterAssets" :filter="search" />
    </div>
  </f-bottom-sheet>
</template>

<script lang="ts">
import { Asset } from "@foxone/mixin-api/types";
import { Component, Model, Vue } from "vue-property-decorator";
import AssetSelectField from "./AssetSelectField.vue";
import AssetSearch from "./AssetSearch.vue";
import AssetLogo from "./AssetLogo.vue";
import ListWapper from "../common/ListWarpper.vue";
import { GlobalGetters } from "../../store//types";
import AssetEmpty from "./AssetEmpty.vue";

@Component({
  components: {
    ListWapper,
    AssetSearch,
    AssetLogo,
    AssetEmpty,
    AssetSelectField
  }
})
class AssetSelect extends Vue {
  @Model("change") value!: Asset | null;

  dialog = false;

  loading = false;

  search = "";

  get title() {
    return this.$vuetify.breakpoint.smAndDown ? this.$t("select.asset") : "";
  }

  get assets(): Asset[] {
    const assets: Asset[] =
      this.$store.getters[GlobalGetters.GET_MERGED_ASSETS];

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
      const search = this.search?.toLowerCase() ?? "";

      return symbol.startsWith(search) || name.startsWith(search);
    });
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
}
export default AssetSelect;
</script>

<style lang="scss" scoped>
.asset-list {
  max-height: 60vh;
  overflow: auto;
}

.asset-search {
  border-radius: 0 !important;

  ::v-deep {
    .v-input__slot {
      background-color: var(--v-bg_card-base) !important;
    }
  }
}

.asset-select {
  &::before {
    display: none;
  }
}
</style>
