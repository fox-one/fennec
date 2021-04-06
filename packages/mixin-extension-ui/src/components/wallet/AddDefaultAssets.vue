<template>
  <v-btn
    text
    x-small
    color="primary"
    :loading="loading"
    @click="handleAddDefaultAssets"
  >
    Add Default Assets
  </v-btn>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { EOS_ASSET_ID, BTC_ASSET_ID, ETHEREUM_ASSET_ID } from "../../defaults";

@Component
class AddDefaultAssets extends Vue {
  loading = false;

  async handleAddDefaultAssets() {
    this.loading = true;
    try {
      const assets = [BTC_ASSET_ID, ETHEREUM_ASSET_ID, EOS_ASSET_ID];
      await Promise.all(assets.map((x) => this.$endpoints.getAsset(x)));
      await this.$utils.app.loadWalletData(this);
    } catch (error) {
      this.$utils.helper.errorToast(this, error);
    }
    this.loading = false;
  }
}
export default AddDefaultAssets;
</script>
