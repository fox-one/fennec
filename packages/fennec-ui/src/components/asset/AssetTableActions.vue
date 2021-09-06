<template>
  <v-layout>
    <v-flex class="table-search">
      <asset-search :search.sync="bindSearch" />
    </v-flex>

    <asset-add @click.native="handleAddAsset" />
  </v-layout>
</template>

<script lang="ts">
import { Component, PropSync, Vue } from "vue-property-decorator";
import AssetSearch from "./AssetSearch.vue";
import AssetAdd from "./AssetAdd.vue";

@Component({
  components: {
    AssetAdd,
    AssetSearch
  }
})
class AssetTableActions extends Vue {
  @PropSync("search") bindSearch!: string;

  handleAddAsset() {
    this.$router.push({ name: "asset-add" });
  }
}

export default AssetTableActions;
</script>

<style lang="scss" scoped>
.table-search {
  ::v-deep {
    .v-input__slot {
      padding-right: 0 !important;
    }
  }
}
</style>
