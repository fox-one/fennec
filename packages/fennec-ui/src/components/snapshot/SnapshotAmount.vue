<template>
  <div class="snapshot-amount" :class="classes">
    <asset-logo :size="32" :asset="meta.asset" class="hidden-sm-and-down" />

    <div class="title-1" :style="{ color: meta.amountColor }">
      <span class="f-number">{{ meta.text }}</span>
      <span class="symbol">{{ meta.symbol }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { SnapshotMeta } from "../../utils/activity";
import AssetLogo from "../asset/AssetLogo.vue";

@Component({
  components: {
    AssetLogo
  }
})
class SnapshotAmount extends Vue {
  @Prop() snapshot!: SnapshotMeta;

  get classes() {
    return {
      "snapshot-amount--popup": this.$vuetify.breakpoint.smAndDown
    };
  }

  get meta() {
    const { amountColor, amountSymbol, amountText, asset } = this.snapshot;

    const text = `${amountSymbol} ${amountText}`;
    const symbol = asset?.symbol ?? "";

    return { text, symbol, asset, amountColor };
  }
}
export default SnapshotAmount;
</script>

<style lang="scss" scoped>
.snapshot-amount {
  display: flex;
  align-items: center;

  .title-1 {
    margin-left: 8px;
  }

  &.snapshot-amount--popup {
    .title-1 {
      margin-left: 0;
    }
  }

  .symbol {
    font-size: 14px;
  }
}
</style>
