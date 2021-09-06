<template>
  <input-field label="Currency">
    <v-select
      v-model="currency"
      filled
      color="white"
      :menu-props="{ 'offset-y': true, 'nudge-top': -10 }"
      :items="items"
    >
      <template #item="{ item, on }">
        <v-list-item
          class="currency-item"
          :class="{ 'currency-item--active': currency === item.value }"
          v-on="on"
        >
          <v-flex>{{ item.text }}</v-flex>

          <v-icon size="16" class="icon-selected">$FIconCheck4P</v-icon>
        </v-list-item>
      </template>
    </v-select>
  </input-field>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Sync } from "vuex-pathify";
import { CURRENCY } from "../../utils/currency";

@Component
class CurrencySetting extends Vue {
  @Sync("app/settings@currency") currency;

  get items() {
    return Object.values(CURRENCY).map((x) => ({
      text: x.name,
      value: x.name
    }));
  }
}
export default CurrencySetting;
</script>

<style lang="scss" scoped>
.currency-item {
  color: var(--v-label-base) !important;

  .icon-selected {
    visibility: hidden;
  }

  &--active {
    color: white !important;

    .icon-selected {
      visibility: visible;
    }
  }
}
</style>
