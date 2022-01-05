<template>
  <f-button :loading="loading" color="primary" @click="handleAddDefaultAssets">
    {{ $t("add.default.assets") }}
  </f-button>
</template>

<script lang="ts">
import { GlobalActions } from "@foxone/fennec-ui/store/types";
import { Component, Vue } from "vue-property-decorator";

@Component
class AddDefaultAssets extends Vue {
  loading = false;

  async handleAddDefaultAssets() {
    this.loading = true;

    try {
      const assets = await this.$endpoints.getNetworkChains();

      await Promise.all(
        assets.map((x) => this.$endpoints.getAsset(x.chain_id))
      );

      await this.$store.dispatch(GlobalActions.LOAD_ASSETS);
    } catch (error) {
      this.$utils.helper.errorToast(this, error);
    }

    this.loading = false;
  }
}
export default AddDefaultAssets;
</script>
