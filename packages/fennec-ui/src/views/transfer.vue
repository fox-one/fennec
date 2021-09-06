<template>
  <div></div>
</template>

<script lang="ts">
import { Component, Mixins } from "vue-property-decorator";
import PageView from "../mixin/page";

@Component
class TransferPage extends Mixins(PageView) {}
export default TransferPage;
</script>
