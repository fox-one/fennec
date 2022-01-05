<template>
  <f-bottom-sheet v-model="dialog" wapper-in-desktop="dialog">
    <template #activator="{ on }">
      <slot name="activator" :on="on" />
    </template>

    <div class="pa-4">
      <div class="information-title title-1">
        <asset-logo :asset="asset" :size="32" />
        <span class="ml-2">{{ meta.name }}</span>
      </div>

      <div class="mt-8">
        <information-item
          v-for="(item, index) in meta.informations"
          :key="index"
          :title="item.title"
          :value="item.value"
        />
      </div>
    </div>
  </f-bottom-sheet>
</template>

<script lang="ts">
import { GlobalGetters } from "@foxone/fennec-ui/store/types";
import { Asset } from "@foxone/mixin-api/types";
import { Component, Vue, Prop } from "vue-property-decorator";
import AssetLogo from "./AssetLogo.vue";

@Component({
  components: {
    AssetLogo
  }
})
class AssetInformationModal extends Vue {
  @Prop() asset!: Asset;

  dialog = false;

  get meta() {
    const getAsset = this.$store.getters[GlobalGetters.GET_ASSET_BY_ID];
    const chainAsset = getAsset(this.asset?.asset_id ?? "");

    const informations = [
      { title: this.$t("symbol"), value: this.asset?.symbol ?? "" },
      { title: this.$t("chain"), value: chainAsset?.name ?? "" },
      { title: this.$t("asset.key"), value: this.asset?.asset_key ?? "" }
    ];

    return {
      informations,
      name: this.asset?.name ?? ""
    };
  }
}
export default AssetInformationModal;
</script>

<style lang="scss" scoped>
.information-title {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
