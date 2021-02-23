<template>
  <div class="asset-actions pa-5 text-center">
    <div class="action-item px-5" @click="handleDeposit">
      <v-btn icon>
        <img src="../../assets/images/deposit.svg" class="icon" />
      </v-btn>
      <div class="caption text--secondary">Receive</div>
    </div>

    <div class="action-item px-5" @click="handleSend">
      <v-btn icon>
        <img src="../../assets/images/withdraw.svg" class="icon" />
      </v-btn>
      <div class="caption text--secondary">Send</div>
    </div>

    <div class="action-item px-5" @click="handleSwap">
      <v-btn icon>
        <img src="../../assets/images/transfer.svg" class="icon" />
      </v-btn>
      <div class="caption text--secondary">Swap</div>
    </div>
  </div>
</template>

<script lang="ts">
import { Asset } from "@foxone/mixin-sdk/types";
import { Component, Vue, Prop } from "vue-property-decorator";

@Component
class AssetActions extends Vue {
  @Prop() asset!: Asset | undefined;

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

  handleSwap() {
    this.$emit("swap");
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
