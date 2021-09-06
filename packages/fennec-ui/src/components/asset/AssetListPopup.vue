<template>
  <div>
    <v-list-item
      v-for="(asset, index) in items"
      :key="index"
      class="px-4"
      @click="handleClick(asset)"
    >
      <span class="mr-4 d-flex">
        <asset-logo :size="24" :asset="asset" />
      </span>
      <v-list-item-content>
        <v-list-item-title class="balance f-number">
          <span>{{ asset.balance }}</span>
          <span>{{ asset.symbol }}</span>
        </v-list-item-title>
        <v-list-item-subtitle>
          <span class="amount f-number">{{ asset.amount }}</span>
        </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>

    <asset-empty :items="items" :filter="filter" />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { TableItem } from "./AssetTable.vue";
import AssetLogo from "./AssetLogo.vue";
import AssetEmpty from "./AssetEmpty.vue";

@Component({
  components: {
    AssetLogo,
    AssetEmpty
  }
})
class AssetListPopup extends Vue {
  @Prop() items!: TableItem[];

  @Prop() filter!: string;

  handleClick({ id }) {
    this.$router.push({ name: "asset-detail", query: { id } });
  }
}
export default AssetListPopup;
</script>

<style lang="scss" scoped>
.balance {
  font-size: 13px;
  font-weight: 500;
}

.amount {
  font-size: 12px;
  color: var(--v-label-base);
}
</style>
