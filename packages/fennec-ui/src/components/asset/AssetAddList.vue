<template>
  <div class="mt-4">
    <div v-if="loading" class="append">
      <f-loading />
    </div>

    <div v-else>
      <div v-if="!empty">
        <asset-add-item
          v-for="(asset, index) in assets"
          :key="index"
          :asset="asset"
        />
      </div>

      <div v-else class="append">
        <span class="label-1 my-5">No Result</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Asset } from "@foxone/mixin-api/types";
import { Component, Vue, Prop } from "vue-property-decorator";
import AssetAddItem from "./AssetAddItem.vue";

@Component({
  components: {
    AssetAddItem
  }
})
class AssetAddList extends Vue {
  @Prop() assets!: Asset[];

  @Prop() loading!: boolean;

  get empty() {
    return this.assets.length === 0;
  }
}
export default AssetAddList;
</script>

<style lang="scss" scoped>
.append {
  padding: 24px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
</style>
