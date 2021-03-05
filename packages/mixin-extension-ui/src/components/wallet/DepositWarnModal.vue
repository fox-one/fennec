<template>
  <f-bottom-sheet v-model="sheet" :persistent="meta.persistent">
    <template #title>
      {{ meta.title }}
    </template>
    <v-row>
      <v-col class="d-flex flex-column justify-center align-center px-5">
        <f-mixin-asset-logo :logo="meta.logo" :chainLogo="meta.chainLogo" />
        <div class="my-5 subtitle-1 text-center">
          {{ meta.tip }}, {{ meta.confirmations }}
        </div>
        <div class="error--text my-5 text-center">{{ meta.getAttention }}</div>
        <v-btn
          rounded
          depressed
          color="primary"
          :disabled="meta.persistent"
          @click="sheet = false"
        >
          {{ $t("common.got-it") }} {{ meta.timerText }}
        </v-btn>
      </v-col>
    </v-row>
  </f-bottom-sheet>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { Asset } from "@foxone/mixin-sdk/types";
import { Getter } from "vuex-class";
import {
  BITCOIN_CHAIN_ID,
  ETHEREUM_CHAIN_ID,
  EOS_CHAIN_ID,
  TRON_CHAIN_ID
} from "../../defaults";

@Component
class DepositWarnModal extends Vue {
  @Getter("wallet/mixin/getMergedAssets") mergedAssets!: Asset[];

  @Prop() asset!: Asset;

  sheet = false;

  seconds = 3;

  get meta() {
    const { name, icon_url, asset_id, chain_id, confirmations } = this.asset;
    const chainAsset = this.mergedAssets.find((x) => x.asset_id === chain_id);
    return {
      persistent: this.seconds > 0,
      title: `${name} ${this.$t("common.deposit")}`,
      logo: icon_url,
      chainLogo: chainAsset && chainAsset.icon_url,
      tip: this.getTip(asset_id, name),
      confirmations: this.$t("wallet.deposit.tip.confirmation", {
        confirmations
      }),
      getAttention: this.getAttention(asset_id, name),
      timerText: (this.seconds > 0 && `(${this.seconds}S)`) || ""
    };
  }

  getAttention(id, name) {
    switch (id) {
      case EOS_CHAIN_ID:
        return this.$t("wallet.deposit.tip.account.try-little", {
          asset: name
        });
      default:
        return this.$t("wallet.deposit.tip.try-little");
    }
  }

  getTip(id, name) {
    switch (id) {
      case BITCOIN_CHAIN_ID:
        return this.$t("wallet.deposit.tip.btc");
      case EOS_CHAIN_ID:
        return this.$t("wallet.deposit.tip.eos");
      case ETHEREUM_CHAIN_ID:
        return this.$t("wallet.deposit.tip.eth");
      case TRON_CHAIN_ID:
        return this.$t("wallet.deposit.tip.trx");
      default:
        return this.$t("wallet.deposit.tip.common", { asset: name });
    }
  }

  setupTimer() {
    setTimeout(() => {
      if (this.seconds > 0) {
        this.seconds -= 1;
        this.setupTimer();
      }
    }, 1000);
  }

  mounted() {
    this.sheet = true;
    this.setupTimer();
  }
}
export default DepositWarnModal;
</script>
