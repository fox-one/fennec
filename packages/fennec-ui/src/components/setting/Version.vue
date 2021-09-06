<template>
  <div class="text-center text-4 mt-16">
    <p class="ma-0">
      <a :href="meta.POLICY_URL" target="_blank" class="white--text">
        Privacy Policy
      </a>
      <span> · </span>
      <a :href="meta.TERMS_URL" target="_blank" class="white--text">
        Terms of Use
      </a>
    </p>
    <p class="ma-0 label--text mt-2">Version: {{ meta.version }}</p>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { VERSION, POLICY_URL, TERMS_URL } from "../../defaults";

@Component
class Version extends Vue {
  get meta() {
    return {
      version: VERSION,
      POLICY_URL,
      TERMS_URL
    };
  }
}
export default Version;
</script>
