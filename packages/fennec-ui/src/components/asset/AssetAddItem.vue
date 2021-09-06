<template>
  <v-layout class="asset-item">
    <v-flex>
      <asset-name :asset="asset" />
    </v-flex>

    <v-btn v-if="added" icon small color="success">
      <v-icon>$FIconCheck</v-icon>
    </v-btn>

    <v-btn v-else :loading="loading" icon small @click="requestAddAsset">
      <v-icon>$FIconAdd</v-icon>
    </v-btn>
  </v-layout>
</template>

<script lang="ts">
import { Asset } from "@foxone/mixin-api/types";
import { Component, Vue, Prop } from "vue-property-decorator";
import AssetName from "./AssetName.vue";
import { GlobalMutations, GlobalGetters } from "../../store/types";

@Component({
  components: {
    AssetName
  }
})
class AssetAddItem extends Vue {
  @Prop() asset!: Asset;

  loading = false;

  get added() {
    const added: Asset[] = this.$store.getters[GlobalGetters.GET_MERGED_ASSETS];
    const addedMap = added.reduce((m, x) => ({ ...m, [x.asset_id]: true }), {});

    return !!addedMap[this.asset.asset_id];
  }

  async requestAddAsset() {
    this.loading = true;

    try {
      const res = await this.$endpoints.getAsset(this.asset.asset_id);

      this.$store.commit(GlobalMutations.ADD_ADDITION_ASSET, res);
      this.$uikit.toast.success({ message: "Added Successfully" });
    } catch (error) {
      this.$utils.helper.errorToast(this, error);
    }

    this.loading = false;
  }
}
export default AssetAddItem;
</script>

<style lang="scss" scoped>
.asset-item {
  min-height: 56px;
  display: flex;
  align-items: center;
  background-color: var(--v-bg_card-base);
  border-radius: 16px;
  padding: 0 12px;
  margin-bottom: 16px;
}
</style>
