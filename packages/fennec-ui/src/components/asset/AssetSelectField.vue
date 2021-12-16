<template>
  <f-list-item
    :title="meta.symbol"
    :subtitle="meta.name"
    class="bg_card rounded"
  >
    <template #head>
      <f-loading v-if="loading" size="28" />

      <v-icon v-else-if="!meta.icon"> $mdiHelpCircle </v-icon>

      <asset-logo v-if="asset" :size="32" :asset="asset" />
    </template>
  </f-list-item>
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
class AssetSelectField extends Vue {
  @Prop() asset!: Asset;

  @Prop() loading!: boolean;

  get meta() {
    return {
      symbol: this.asset?.symbol ?? this.$t("select.asset"),
      name: this.asset?.name ?? "",
      icon: this.asset?.icon_url,
      chainId: this.asset?.chain_id
    };
  }
}
export default AssetSelectField;
</script>

<style lang="scss" scoped>
.f-list-item {
  height: 56px;
  cursor: pointer;
}
</style>
