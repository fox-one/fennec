<template>
  <div>
    <div class="mb-3 label-1">{{ label }}</div>
    <div v-if="hint" class="text_2--text hint mb-3">{{ hint }}</div>
    <slot />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component
class Input extends Vue {
  @Prop() label!: string;

  @Prop() hint!: string;
}
export default Input;
</script>

<style lang="scss" scoped>
.hint {
  font-size: 12px;
}
</style>
