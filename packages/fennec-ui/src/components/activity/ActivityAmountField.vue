<template>
  <span :style="{ color: meta.amountColor }" class="f-number">
    {{ meta.text }}
  </span>
</template>

<script lang="ts">
import { Asset } from "@foxone/mixin-api/types";
import { Component, Vue, Prop } from "vue-property-decorator";

@Component
class ActivityAmountField extends Vue {
  @Prop() item;

  asset: Asset | null = null;

  get meta() {
    const { amountColor, amountSymbol, amountText } = this.item;
    const symbol = (this.item.symbol || this.asset?.symbol) ?? "";
    const text = `${amountSymbol} ${amountText} ${symbol}`;

    return {
      text,
      amountColor
    };
  }

  async mounted() {
    if (!this.item.asset) {
      this.asset = await this.$endpoints.getAsset(this.item.asset_id);
    }
  }
}
export default ActivityAmountField;
</script>
