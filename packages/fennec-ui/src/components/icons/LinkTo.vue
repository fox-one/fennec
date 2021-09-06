<template>
  <svg
    width="10"
    height="2"
    viewBox="0 0 10 2"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="9" cy="1" r="1" fill="white" />
    <circle opacity="0.6" cx="5" cy="1" r="1" fill="white" />
    <circle opacity="0.3" cx="1" cy="1" r="1" fill="white" />
  </svg>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
class LinkTo extends Vue {}
export default LinkTo;
</script>
