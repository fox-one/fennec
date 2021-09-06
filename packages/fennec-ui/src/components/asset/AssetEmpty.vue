<template>
  <div v-show="show">
    <div v-if="!!filter" class="empty-no-result">
      <span class="label-1">No Result</span>
    </div>
    <div v-else class="empty-no-result">
      <v-img :src="require('../../assets/images/no-assets.png')" />
      <span class="label-1 my-5">No Assets</span>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component
class AssetEmpty extends Vue {
  @Prop() filter!: string;

  @Prop() items;

  get show() {
    return this.items.length === 0;
  }
}
export default AssetEmpty;
</script>

<style lang="scss" scoped>
.empty-no-result {
  padding: 24px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
</style>
