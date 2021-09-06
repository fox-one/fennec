<template>
  <f-mixin-asset-logo
    :size="size"
    :logo="meta.icon"
    :chain-logo="meta.chainLogo"
    :class="classes"
    v-bind="$attrs"
  />
</template>

<script lang="ts">
import { GlobalActions, GlobalGetters } from "@foxone/fennec-ui/store/types";
import { Asset } from "@foxone/mixin-api/types";
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
class AssetLogo extends Vue {
  @Prop() asset!: Asset;

  @Prop() size!: string | number;

  get classes() {
    return { "asset-icon": true, "asset-icon--small": this.small };
  }

  get small() {
    return +this.size <= 24;
  }

  get meta() {
    const getChainAssetLogo = this.$utils.asset.getChainAssetLogo;

    return {
      icon: this.asset?.icon_url,
      chainLogo: getChainAssetLogo(this, this.asset?.chain_id)
    };
  }

  mounted() {
    if (this.asset?.chain_id) {
      const getAssetById = this.$store.getters[GlobalGetters.GET_ASSET_BY_ID];
      const asset = getAssetById(this.asset.chain_id);

      if (!asset) {
        this.$store.dispatch(GlobalActions.LOAD_ASSET, this.asset.chain_id);
      }
    }
  }
}
export default AssetLogo;
</script>

<style lang="scss" scoped>
.asset-icon {
  ::v-deep {
    .f-asset-logo__chain {
      left: -2px;
      bottom: -2px;
    }
  }

  &--small {
    ::v-deep {
      .f-asset-logo__chain {
        width: 10px !important;
        height: 10px !important;
        left: -2px;
        bottom: -2px;

        .v-image {
          width: 8px !important;
          height: 8px !important;
        }
      }
    }
  }
}
</style>
