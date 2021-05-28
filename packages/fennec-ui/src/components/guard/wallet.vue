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

    try {
      await this.$utils.app.loadWalletData(this);
    } catch (error) {
      this.$utils.app.handleError(this, error);
    }

    this.loading = false;
  }
}
export default Wallet;
</script>
