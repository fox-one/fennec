<template>
  <v-btn v-if="show" small icon @click="handleMaximize">
    <v-icon>$FIconMax</v-icon>
  </v-btn>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
class ActionMaximize extends Vue {
  get show() {
    return this.$utils.helper.isPopup();
  }

  async handleMaximize() {
    await this.$messages.openWindow("/");
    window.close();
  }
}
export default ActionMaximize;
</script>
