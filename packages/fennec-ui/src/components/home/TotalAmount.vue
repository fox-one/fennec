<template>
  <div class="total-amount" :class="classes">
    <div class="d-inline title-1 mr-4 f-number" v-html="html">
      <!-- <span class="symbol primary--text">
        {{ meta.symbol }}
      </span>
      <span class="f-number">
        {{ meta.totalFiat }}
      </span> -->
    </div>
    <!-- <span class="label-1 f-number">
      <span>≈ {{ meta.totalBTCText }} BTC</span>
    </span> -->
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { GlobalGetters } from "../../store/types";

@Component
class TotalAmount extends Vue {
  get classes() {
    return { "total-amount--popup": this.$vuetify.breakpoint.smAndDown };
  }

  get meta() {
    const getters = this.$store.getters;
    const toFiat = this.$utils.currency.toFiat;
    const symbol = this.$utils.currency.getSymbol(this);
    const format = this.$utils.number.format;

    const totalUSD = getters[GlobalGetters.TOTAL_USD];
    const totalBTC = getters[GlobalGetters.TOTAL_BTC];

    const totalFiat = toFiat(this, { n: totalUSD, intl: false });
    const totalBTCText = format({ n: totalBTC, dp: 8 });

    return {
      symbol,
      totalUSD,
      totalFiat,
      totalBTCText
    };
  }

  get html() {
    const parts = this.$utils.currency.currencyIntl.formatToParts(
      +this.meta.totalFiat
    );

    return parts.reduce((str, part) => {
      if (part.type === "currency") {
        return `${str}<span class="symbol">${part.value}</span>`;
      }

      return `${str}${part.value}`;
    }, "");
  }
}
export default TotalAmount;
</script>

<style lang="scss" scoped>
::v-deep {
  .symbol {
    font-size: 16px;
    color: var(--v-primary-base);
  }
}

.total-amount--popup {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
