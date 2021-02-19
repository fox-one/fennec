<template>
  <f-bottom-sheet>
    <template #activator="{ on }">
      <v-btn icon v-on="on">
        <v-icon size="26">
          {{ $icons.mdiPlus }}
        </v-icon>
      </v-btn>
    </template>
    <template #title> Search asset </template>
    <template #subheader>
      <v-text-field
        v-model="search"
        placeholder="Search"
        dense
        hide-details
        solo
        flat
        background-color="rgba(0, 0, 0, 0.03)"
      />
    </template>
    <list-wapper :loading="loading" :data="assets">
      <v-list>
        <f-list-item
          v-for="(asset, index) in assets"
          :key="index"
          :title="asset.symbol"
          @click="handleSelect(asset)"
        >
          <template #head>
            <v-img width="32" height="32" :src="asset.icon_url" />
          </template>
        </f-list-item>
      </v-list>
    </list-wapper>
  </f-bottom-sheet>
</template>

<script lang="ts">
import { Asset } from "@foxone/mixin-sdk/types";
import { Component, Vue, Watch } from "vue-property-decorator";
import ListWapper from "../hoc/ListWarpper.vue";

@Component({
  components: {
    ListWapper
  }
})
class AssetAdd extends Vue {
  search = "";

  loading = false;

  opting: string | null = null;

  assets: Asset[] = [];

  @Watch("search")
  handleSearchChange = this.$utils.helper.debounce(() => {
    this.requestSearchAssets();
  }, 200);

  handleSelect(asset: Asset) {
    this.$router.push({ name: "deposit", query: { preset: asset.asset_id } });
  }

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
