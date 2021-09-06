<template>
  <span :style="{ color: meta.amountColor }" class="f-number">
    {{ meta.text }}
  </span>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component
class ActivityAmountField extends Vue {
  @Prop() item;

  get meta() {
    const { amountColor, amountSymbol, amountText, symbol } = this.item;

    const text = `${amountSymbol} ${amountText} ${symbol}`;

    return {
      text,
      amountColor
    };
  }
}
export default ActivityAmountField;
</script>
