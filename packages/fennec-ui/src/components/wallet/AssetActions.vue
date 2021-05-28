<template>
  <div class="asset-actions mt-3 text-center">
    <div class="action-item px-5" @click="handleDeposit">
      <img src="../../assets/images/deposit.svg" class="icon" />
      <div class="caption text--secondary">Receive</div>
    </div>

    <div class="action-item px-5" @click="handleSend">
      <img src="../../assets/images/withdraw.svg" class="icon" />
      <div class="caption text--secondary">Send</div>
    </div>

    <div class="action-item px-5">
      <a
        :href="swaoUrl"
        target="_blank"
        rel="noopener noreferrer"
        title="4Swap"
      >
        <img src="../../assets/images/transfer.svg" class="icon" />
      </a>

      <div class="caption text--secondary">Swap</div>
    </div>
  </div>
</template>

<script lang="ts">
import { Asset } from "@foxone/mixin-api/types";
import { Component, Vue, Prop } from "vue-property-decorator";
import { FSWAP_URL } from "../../defaults";

@Component
class AssetActions extends Vue {
  @Prop() asset!: Asset | undefined;

  get swaoUrl() {
    if (this.asset) {
      return FSWAP_URL + `?input=${this.asset.asset_id}`;
    }

    return FSWAP_URL;
  }

  handleDeposit() {
    this.$router.push({
      name: "deposit",
      query: { preset: this.asset?.asset_id ?? "" }
    });
  }

  handleSend() {
    this.$router.push({
      name: "send",
      query: { preset: this.asset?.asset_id ?? "" }
    });
  }
}
export default AssetActions;
</script>

<style scoped>
.action-item {
  display: inline-block;
}

.icon {
  width: 24px;
  height: 24px;
}
</style>
