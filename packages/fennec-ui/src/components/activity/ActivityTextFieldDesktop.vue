<template>
  <div>{{ display }}</div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component
class ActivityTextFieldDesktop extends Vue {
  @Prop() item;

  get display() {
    const { component, confirmations, text, threshold } = this.item;
    let display = text;

    if (component === "transaction") {
      display = this.$t("transaction.confirming", {
        text: `${confirmations}/${threshold}`
      });
    }

    return display;
  }
}
export default ActivityTextFieldDesktop;
</script>
