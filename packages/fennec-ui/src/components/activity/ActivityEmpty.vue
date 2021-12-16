<template>
  <div v-show="!loading && show" class="empty-no-result">
    <span class="label-1 my-5">
      {{ $t("no.activity") }}
    </span>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, InjectReactive } from "vue-property-decorator";

@Component
class AssetEmpty extends Vue {
  @Prop() items;

  @InjectReactive()
  loading;

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
