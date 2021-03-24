<template>
  <v-list-item class="px-0">
    <span class="mr-2">
      <v-progress-circular
        :rotate="-90"
        :value="item.progress"
        :size="20"
        :width="2"
        color="primary"
      />
    </span>
    <v-list-item-content>
      <v-list-item-title>
        <span class="f-body-1">
          {{ item.text }}
        </span>
      </v-list-item-title>
      <v-list-item-subtitle>
        <div class="f-caption text--secondary transaction-subtitle">
          <span>{{ item.time }}</span>
          <span>From {{ item.sender }}</span>
        </div>
      </v-list-item-subtitle>
    </v-list-item-content>
    <div class="text-right ml-3">
      <div>
        <span
          :style="{ color: item.amountColor }"
          class="f-body-1 font-weight-bold"
        >
          {{ item.amountText }}
        </span>
        <span class="f-caption">{{ item.symbol }}</span>
      </div>
      <div class="f-caption text--secondary">
        <span>{{ item.amountFiat }}</span>
      </div>
    </div>
  </v-list-item>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component
class TransactionListItem extends Vue {
  @Prop() item;
}
export default TransactionListItem;
</script>

<style lang="scss" scoped>
.transaction-subtitle {
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
