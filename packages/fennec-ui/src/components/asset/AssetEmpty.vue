<template>
  <div v-show="show">
    <div v-if="!!filter" class="empty-no-result">
      <span class="label-1">
        {{ $t("no.result") }}
      </span>
    </div>
    <div v-else class="empty-no-result">
      <v-img :src="require('../../assets/images/no-assets.png')" />
      <span class="label-1 my-5">
        {{ $t("no.assets") }}
      </span>

      <add-default-assets v-if="noWalletAssets" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import AddDefaultAssets from "./AddDefaultAssets.vue";
import { GlobalGetters } from "../../store/types";

import { Asset } from "@foxone/mixin-api/types";

@Component({
  components: {
    AddDefaultAssets
  }
})
class AssetEmpty extends Vue {
  @Prop() filter!: string;

  @Prop() items;

  get show() {
    return this.items.length === 0;
  }

  get noWalletAssets() {
    let assets: Asset[] = this.$store.getters[GlobalGetters.GET_MERGED_ASSETS];

    return assets.length === 0;
  }
}
export default AssetEmpty;
</script>

<style lang="scss" scoped>
.empty-no-result {
  padding: 24px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
</style>
