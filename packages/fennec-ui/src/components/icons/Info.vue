<template>
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M8.75 5C8.75 4.58579 8.41421 4.25 8 4.25C7.58579 4.25 7.25 4.58579 7.25 5V8.64538C7.48161 8.55163 7.73478 8.5 8 8.5C8.26523 8.5 8.51839 8.55163 8.75 8.64538V5Z"
      fill="currentColor"
    />
    <path
      d="M8 11.5C8.55228 11.5 9 11.0523 9 10.5C9 9.94771 8.55228 9.5 8 9.5C7.44772 9.5 7 9.94771 7 10.5C7 11.0523 7.44772 11.5 8 11.5Z"
      fill="currentColor"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M8 1.25C4.27208 1.25 1.25 4.27208 1.25 8C1.25 11.7279 4.27208 14.75 8 14.75C11.7279 14.75 14.75 11.7279 14.75 8C14.75 4.27208 11.7279 1.25 8 1.25ZM2.75 8C2.75 5.10051 5.10051 2.75 8 2.75C10.8995 2.75 13.25 5.10051 13.25 8C13.25 10.8995 10.8995 13.25 8 13.25C5.10051 13.25 2.75 10.8995 2.75 8Z"
      fill="currentColor"
    />
  </svg>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
class Info extends Vue {}
export default Info;
</script>
