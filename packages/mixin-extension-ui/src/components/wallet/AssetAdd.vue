<template>
  <f-bottom-sheet v-model="dialog">
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
        dense
        solo
        hide-details
        flat
        background-color="transparent"
        placeholder="Search"
        class="f-bg-greyscale-6"
      />
    </template>
    <list-wapper :loading="loading" :data="assets">
      <v-list>
        <v-list-item v-for="(asset, index) in assets" :key="index">
          <span class="d-flex">
            <f-mixin-asset-logo
              :size="32"
              :logo="asset.icon_url"
              :chain-logo="getAssetChainLogo(asset)"
              class="mr-5"
            />
          </span>
          <v-list-item-content>
            <v-list-item-title>
              {{ asset.symbol }}
            </v-list-item-title>
            <v-list-item-subtitle>
              {{ asset.name }}
            </v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-action>
            <v-btn
              v-if="getAssetAdded(asset)"
              text
              small
              color="error"
              :disabled="getAssetRemoveCanOrNot(asset)"
              @click="requestRemoveAsset(asset)"
            >
              Remove
            </v-btn>
            <v-btn
              v-else
              text
              small
              color="primary"
              :loading="adding === asset.asset_id"
              @click="requestAddAsset(asset)"
            >
              Add
            </v-btn>
          </v-list-item-action>
        </v-list-item>
      </v-list>
    </list-wapper>
  </f-bottom-sheet>
</template>

<script lang="ts">
import { Asset } from "@foxone/mixin-sdk/types";
import { Component, Vue, Watch } from "vue-property-decorator";
import ListWapper from "../common/ListWarpper.vue";
import {
  WalletModuleKey,
  MutationTypes,
  GetterKeys
} from "../../store/modules/wallet/types";

@Component({
  components: {
    ListWapper
  }
})
class AssetAdd extends Vue {
  dialog = false;

  search = "";

  loading = false;

  adding: string = "";

  opting: string | null = null;

  assets: Asset[] = [];

  @Watch("search")
  handleSearchChange = this.$utils.helper.debounce(() => {
    this.requestSearchAssets();
  }, 200);

  handleSelect(asset: Asset) {
    this.$router.push({ name: "deposit", query: { preset: asset.asset_id } });
  }

  handleAddedChange(add: boolean, asset: Asset) {
    if (add) {
      this.requestAddAsset(asset);
    } else {
      this.requestRemoveAsset(asset);
    }
  }

  async requestAddAsset(asset: Asset) {
    this.adding = asset.asset_id;
    try {
      const res = await this.$endpoints.getAsset(asset.asset_id);
      this.$store.commit(
        WalletModuleKey + MutationTypes.ADD_ADDITION_ASSET,
        res
      );
    } catch (error) {
      this.$utils.helper.errorToast(this, error);
    }
    this.adding = "";
  }

  async requestRemoveAsset(asset: Asset) {
    this.$store.commit(
      WalletModuleKey + MutationTypes.REMVOE_ADDITION_ASSET,
      asset
    );
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

  getAssetChainLogo(asset: Asset) {
    return this.$utils.helper.getChainAssetLogo(this, asset.chain_id);
  }

  getAssetAdded(asset: Asset) {
    const additionAssets: Asset[] = this.$store.getters[
      WalletModuleKey + GetterKeys.GET_MERGED_ASSETS
    ];
    const found = additionAssets.find((x) => x.asset_id === asset.asset_id);
    return Boolean(found);
  }

  getAssetRemoveCanOrNot(asset: Asset) {
    const assets: Asset[] = this.$store.state.wallet.assets;
    const found = assets.find((x) => x.asset_id === asset.asset_id);
    return Boolean(found);
  }
}
export default AssetAdd;
</script>
