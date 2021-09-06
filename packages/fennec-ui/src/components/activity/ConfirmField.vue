<template>
  <v-progress-circular
    v-if="meta.show"
    :rotate="-90"
    :value="item.progress"
    :size="12"
    :width="2"
    color="success"
  />
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component
class ConfirmField extends Vue {
  @Prop() item;

  get meta() {
    return {
      confirmations: this.item.confirmations,
      threshold: this.item.threshold,
      progress: this.item.progress,
      show: this.item.component === "transaction"
    };
  }
}
export default ConfirmField;
</script>
