<template>
  <div class="asset-actions pa-5 text-center">
    <div class="action-item px-5" @click="handleDeposit">
      <v-btn icon>
        <img src="../../assets/images/deposit.svg" class="icon" />
      </v-btn>
      <div class="caption text--secondary">Deposit</div>
    </div>

    <div class="action-item px-5" @click="handleWithdraw">
      <v-btn icon>
        <img src="../../assets/images/withdraw.svg" class="icon" />
      </v-btn>
      <div class="caption text--secondary">Withdraw</div>
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
import { Component, Vue } from "vue-property-decorator";

@Component
class AssetActions extends Vue {
  handleDeposit() {
    // this.$emit("deposit");
    this.$router.push({ name: "deposit" });
  }

  handleWithdraw() {
    this.$emit("withdraw");
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
