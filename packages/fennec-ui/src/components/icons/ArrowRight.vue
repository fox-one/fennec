<template>
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    class="icon"
  >
    <path
      d="M6 3L10 8L6 13"
      :stroke="colors[0]"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
class ArrowRight extends Vue {
  get colors() {
    return [this.$vuetify.theme.dark ? "#fff" : "#000"];
  }
}
export default ArrowRight;
</script>

<style lang="scss" scoped></style>
