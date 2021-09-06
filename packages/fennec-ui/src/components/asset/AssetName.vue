<template>
  <div class="asset-name">
    <asset-logo :size="24" :asset="asset" />

    <span class="ml-4">
      <slot>
        {{ asset.symbol }}
      </slot>
    </span>
  </div>
</template>

<script lang="ts">
import { Asset } from "@foxone/mixin-api/types";
import { Component, Vue, Prop } from "vue-property-decorator";
import AssetLogo from "./AssetLogo.vue";

@Component({
  components: {
    AssetLogo
  }
})
class AssetName extends Vue {
  @Prop() asset!: Asset;
}
export default AssetName;
</script>

<style lang="scss" scoped>
.asset-name {
  display: flex;
  align-items: center;
}
</style>
