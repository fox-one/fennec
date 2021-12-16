<template>
  <div class="total-amount" :class="classes">
    <div class="d-inline title-1 mr-4 f-number" v-html="html"></div>
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
    const totalUSD = getters[GlobalGetters.TOTAL_USD];

    return { totalUSD };
  }

  get html() {
    const parts: any = this.$utils.currency.toFiat(
      this,
      {
        n: +this.meta.totalUSD
      },
      true
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
