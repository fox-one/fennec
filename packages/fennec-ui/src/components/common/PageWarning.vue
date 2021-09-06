<template>
  <div v-show="value" class="page-warning bg_card text-4" :style="styles">
    <v-container class="content pa-4 pr-8">
      <slot />

      <v-btn icon small class="icon-close" :style="styles" @click="handleClose">
        <v-icon>$close</v-icon>
      </v-btn>
    </v-container>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component
class PageWarning extends Vue {
  @Prop({ type: String, default: "#f44c4c" }) color!: string;

  value = true;

  get styles() {
    return { color: this.color };
  }

  show() {
    this.value = true;
  }

  handleClose() {
    this.value = false;
  }
}
export default PageWarning;
</script>

<style lang="scss" scoped>
.page-warning {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 10;

  .content {
    position: relative;
  }

  .icon-close {
    position: absolute;
    top: 12px;
    right: 8px;
  }
}
</style>
