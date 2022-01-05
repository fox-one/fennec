<template>
  <div>
    <asset-search :search.sync="search" :transparent="false" />

    <asset-add-list :assets="meta.assets" :loading="loading" />
  </div>
</template>

<script lang="ts">
import { Component, Mixins, Watch } from "vue-property-decorator";
import { NetworkTopAsset } from "@foxone/mixin-api/types";
import PageView from "../../mixin/page";
import AssetSearch from "../../components/asset/AssetSearch.vue";
import AssetAddList from "../../components/asset/AssetAddList.vue";
// import { GlobalGetters } from "@foxone/fennec-ui/store/types";

@Component({
  components: {
    AssetSearch,
    AssetAddList
  }
})
class AssetAdd extends Mixins(PageView) {
  search = "";

  loading = false;

  assets: NetworkTopAsset[] = [];

  get title() {
    return this.$t("asset.add");
  }

  get meta() {
    // const added: Asset[] = this.$store.getters[GlobalGetters.GET_MERGED_ASSETS];
    // const addedMap = added.reduce((m, x) => ({ ...m, [x.asset_id]: true }), {});
    // const assets = this.assets.filter((x) => !addedMap[x.asset_id]);

    return { assets: this.assets };
  }

  @Watch("search")
  handleSearchChange = this.$utils.helper.debounce(() => {
    this.requestSearchAssets();
  }, 200);

  async requestSearchAssets() {
    if (!this.search) {
      return;
    }

    this.loading = true;

    try {
      const assets = await this.$endpoints.searchNetworkAsset(this.search);

      this.assets = assets;
    } catch (error) {
      this.$utils.helper.errorToast(this, error);
    }

    this.loading = false;
  }
}
export default AssetAdd;
</script>
