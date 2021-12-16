<template>
  <search-input
    v-model="bindSearch"
    hide-details
    clearable
    :placeholder="$t('search')"
    :class="classes"
  >
  </search-input>
</template>

<script lang="ts">
import { Component, Vue, PropSync, Prop } from "vue-property-decorator";
import AssetList from "./AssetList.vue";

@Component({
  components: {
    AssetList
  }
})
class AssetSearch extends Vue {
  @PropSync("search") bindSearch!: string;

  @Prop({ type: Boolean, default: true }) transparent!: boolean;

  get classes() {
    return {
      "f-input--transparent": this.transparent
    };
  }
}
export default AssetSearch;
</script>

<style lang="scss" scoped>
.f-input--transparent {
  ::v-deep {
    .v-input__slot {
      background: transparent !important;
    }
  }
}
</style>
