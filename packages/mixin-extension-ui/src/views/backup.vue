<template>
  <v-container>
    <f-tip type="error">
      <span class="font-weight-bold">Notice:</span>
      <br />
      Keystore file is the only way to access your assets in mixin network.
      <br />
      Please backup your keystore file and keep it safe.
    </f-tip>
  </v-container>
</template>

<script lang="ts">
import { Component, Mixins } from "vue-property-decorator";
import PageView from "../mixin/page";

@Component
class BackUpPage extends Mixins(PageView) {
  get title() {
    return "BackUp";
  }
}
export default BackUpPage;
</script>
