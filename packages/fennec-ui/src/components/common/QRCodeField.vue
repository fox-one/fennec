<template>
  <f-panel class="field">
    <div class="label-1 text-center">
      <slot name="title" />
    </div>
    <div class="mt-4 d-flex justify-center">
      <f-qr-code :size="128" :text="text" />
    </div>
    <div class="mt-8">
      <slot name="foot" />
    </div>
  </f-panel>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component
class QRCodeField extends Vue {
  @Prop() text!: string;
}
export default QRCodeField;
</script>

<style lang="scss" scoped>
.field {
  height: 100%;
}
</style>
