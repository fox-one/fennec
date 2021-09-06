<template>
  <div :style="styles" class="f-number">
    {{ meta.priceChangeText }}
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component
class AssetPriceChange extends Vue {
  @Prop() change!: string;

  get meta() {
    const toPercent = this.$utils.number.toPercent;
    const getValueColor = this.$utils.color.getValueColor;

    const priceChangeText = toPercent({
      n: this.change,
      dp: 2,
      symbol: true
    });
    const priceChangeColor = getValueColor(this, +this.change);

    return {
      priceChangeText,
      priceChangeColor
    };
  }

  get styles() {
    return {
      color: this.meta.priceChangeColor
    };
  }
}
export default AssetPriceChange;
</script>
