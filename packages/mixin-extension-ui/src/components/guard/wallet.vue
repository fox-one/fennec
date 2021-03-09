<template>
  <div>
    <f-loading v-if="loading" loading fullscreen />
    <router-view v-else />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
class Wallet extends Vue {
  loading = false;

  async mounted() {
    this.loading = true;
    await this.$utils.app.loadWalletData(this);
    this.loading = false;
  }
}
export default Wallet;
</script>
