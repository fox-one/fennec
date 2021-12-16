<template>
  <v-data-table
    :headers="headers"
    :items="items"
    class="f-table"
    fixed-header
    hide-default-footer
    disable-pagination
    @click:row="handleClickRow"
  >
    <template #[`item.id`]="{ item }">
      <asset-name :asset="item" class="f-number">
        {{ item.balance + " " + item.symbol }}
      </asset-name>
    </template>

    <template #[`item.amount`]="{ value }">
      <span class="f-number">
        {{ value }}
      </span>
    </template>

    <template #[`item.price`]="{ value }">
      <span class="f-number">
        {{ value }}
      </span>
    </template>

    <template #[`item.change`]="{ item }">
      <asset-price-change :change="item.priceChange" />
    </template>

    <template #no-data>
      <asset-empty :items="items" :filter="filter" />
    </template>
  </v-data-table>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { TableItem } from "./AssetTable.vue";
import AssetName from "./AssetName.vue";
import AssetPriceChange from "./AssetPriceChange.vue";
import AssetEmpty from "./AssetEmpty.vue";

@Component({
  components: {
    AssetName,
    AssetEmpty,
    AssetPriceChange
  }
})
class AssetListDesktop extends Vue {
  @Prop() items!: TableItem[];

  @Prop() filter!: string;

  get headers() {
    return [
      { text: this.$t("asset"), value: "id", align: "start", sortable: false },
      { text: this.$t("value.now"), value: "amount", sortable: false },
      {
        text: this.$t("price"),
        value: "price",
        sortable: false,
        align: "right"
      },
      {
        text: this.$t("impact.price"),
        value: "change",
        sortable: false,
        align: "right"
      }
    ];
  }

  handleClickRow({ id }) {
    this.$router.push({ name: "asset-detail", query: { id } });
  }
}
export default AssetListDesktop;
</script>
