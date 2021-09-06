<template>
  <div class="asset-add">
    <span v-if="!meta.smAndDown" class="mr-2">Add Asset</span>
    <v-btn small icon>
      <v-icon size="20"> $FIconAdd </v-icon>
    </v-btn>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
class AssetAdd extends Vue {
  get meta() {
    const smAndDown = this.$vuetify.breakpoint.smAndDown;

    return { smAndDown };
  }
}
export default AssetAdd;
</script>

<style lang="scss" scoped>
.asset-add {
  display: flex;
  align-items: center;
  font-size: 14px;
  font-weight: 500;
  padding: 0 8px;
  cursor: pointer;
}
</style>
