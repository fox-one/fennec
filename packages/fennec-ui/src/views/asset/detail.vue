<template>
  <div>
    <asset-balance :asset="meta.asset" />

    <asset-actions :asset="meta.asset" class="mt-8" />

    <f-panel padding="0" class="mt-8 overflow-hidden">
      <div class="detail-title">
        {{ $t("activity") }}
      </div>
      <f-divider class="hidden-md-and-up" />
      <activity-table-detail :asset="meta.asset" />
    </f-panel>
  </div>
</template>

<script lang="ts">
import { Asset } from "@foxone/mixin-api/types";
import { Component, Mixins } from "vue-property-decorator";
import PageView from "../../mixin/page";
import AssetActions from "../../components/asset/AssetActions.vue";
import AssetBalance from "../../components/asset/AssetBalance.vue";
import ActivityTableDetail from "../../components/activity/ActivityTableDetail.vue";
import AssetMenu from "../../components/asset/AssetMenu.vue";
import { GlobalGetters } from "../../store/types";

@Component({
  components: {
    AssetActions,
    AssetBalance,
    ActivityTableDetail
  }
})
class AssetDetail extends Mixins(PageView) {
  get title() {
    return this.$t("asset.details");
  }

  get id() {
    return this.$route.query.id;
  }

  get tailNode() {
    const h = this.$createElement;

    return h(AssetMenu, { props: { asset: this.meta.asset } });
  }

  get meta() {
    const assets: Asset[] =
      this.$store.getters[GlobalGetters.GET_MERGED_ASSETS];
    const asset = assets.find((x) => x.asset_id === this.id);

    return {
      asset
    };
  }
}
export default AssetDetail;
</script>

<style lang="scss" scoped>
.detail-title {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 48px;
  font-size: 14px;
  font-weight: 500;
}
</style>
