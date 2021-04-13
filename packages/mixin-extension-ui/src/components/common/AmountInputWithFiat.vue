<template>
  <div class="amount-input-with-fiat">
    <f-input
      ref="input"
      type="number"
      label="Amount"
      :value="inputValue"
      @input="handleInput"
    >
      <template #append>
        {{ meta.symbol }}
      </template>
      <template #appendOuter>
        <v-btn small icon class="ml-1" @click.stop="handleChangeQuote">
          <v-icon>
            {{ $icons.mdiSwapVertical }}
          </v-icon>
        </v-btn>
      </template>
    </f-input>
    <div class="f-caption text--secondary ml-2 mt-1">
      ≈ {{ meta.quoteAmount + " " + meta.quoteSymbol }}
    </div>
  </div>
</template>

<script lang="ts">
import { Asset } from "@foxone/mixin-sdk/types";
import { Component, Vue, Prop, Model } from "vue-property-decorator";

const FIAT_PERCISION = 2;

@Component
class AmountInputWithFiat extends Vue {
  @Model("change") amount!: string;

  @Prop() asset!: Asset | null;

  @Prop({ default: "", type: String }) placeholder!: string;

  @Prop({ type: Number, default: 8 }) percision!: number;

  inputValue = "";

  useFiat = false;

  get meta() {
    const format = this.$utils.number.toPercision;
    const price = Number(this.asset?.price_usd ?? 0);
    let value = Number(this.inputValue || "0");
    if (isNaN(value)) {
      value = 0;
    }

    const fiatSymbol = "USD";
    const assetSymbol = this.asset?.symbol ?? "";

    let assetAmount: string;
    let fiatAmount: string;

    if (this.useFiat) {
      fiatAmount = value.toString();
      assetAmount = price
        ? format({
            n: value / price,
            p: this.percision
          })
        : "0";
    } else {
      assetAmount = value.toString();
      fiatAmount = format({
        n: value * price,
        p: FIAT_PERCISION
      });
    }

    return {
      assetAmount,
      fiatAmount,
      empty: !Number(this.inputValue),
      symbol: this.useFiat ? fiatSymbol : assetSymbol,
      quoteSymbol: this.useFiat ? assetSymbol : fiatSymbol,
      quoteAmount: this.useFiat ? assetAmount : fiatAmount
    };
  }

  handleInput(value) {
    const percision = this.useFiat ? FIAT_PERCISION : this.percision;
    let v = this.$utils.number.toPercision({ n: value, p: percision });
    if (isNaN(Number(v))) {
      v = "";
    }

    this.inputValue = v;
    this.$emit("change", this.meta.assetAmount);
    const input: any = this.$refs.input;
    input.$children[0].lazyValue = v;
  }

  handleChangeQuote() {
    this.useFiat = !this.useFiat;
  }
}
export default AmountInputWithFiat;
</script>

<style lang="scss" scoped>
.amount-input-with-fiat {
  ::v-deep {
    .v-input__append-outer {
      height: auto !important;
    }
  }
}
</style>
