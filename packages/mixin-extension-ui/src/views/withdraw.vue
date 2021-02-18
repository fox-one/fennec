<template>
  <v-container>
    <v-list-item>
      <v-img />
      <v-list-item-content> asdf </v-list-item-content>
      <v-icon></v-icon>
    </v-list-item>
  </v-container>
</template>

<script lang="ts">
import { Component, Mixins } from "vue-property-decorator";
import PageView from "../mixin/page";

@Component
class WithdrawPage extends Mixins(PageView) {
  get appbar() {
    return {
      back: true
    };
  }

  get title() {
    return "Deposit";
  }

  get meta() {
    return "";
  }
}
export default WithdrawPage;
</script>
