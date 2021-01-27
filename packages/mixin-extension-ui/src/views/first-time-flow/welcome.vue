<template>
  <v-container> WelcomePage </v-container>
</template>

<script lang="ts">
import { Component, Mixins } from "vue-property-decorator";
import PageView from "../../mixin/page";

@Component
class WelcomePage extends Mixins(PageView) {
  get title() {
    return "Welcome";
  }

  get appbar() {
    return {
      show: false
    };
  }
}
export default WelcomePage;
</script>
