<template>
  <span
    v-clipboard:copy="text"
    v-clipboard:success="handleCopySuccess"
    v-clipboard:error="handleCopyFail"
    class="copy-field"
  >
    <slot>
      <v-btn small icon>
        <v-icon>$FIconCopy</v-icon>
      </v-btn>
    </slot>
  </span>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component
class CopyBtn extends Vue {
  @Prop() text!: string;

  handleCopySuccess() {
    this.$utils.helper.onCopySuccess(this);
  }

  handleCopyFail() {
    this.$utils.helper.onCopyFail(this);
  }
}
export default CopyBtn;
</script>

<style lang="scss" scoped>
.copy-field {
  display: inline-block;
  cursor: pointer;
}
</style>
