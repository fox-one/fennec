<template>
  <f-bottom-sheet v-model="sheet" :persistent="meta.persistent">
    <template #title>
      {{ meta.title }}
    </template>
    <v-row>
      <v-col class="d-flex flex-column justify-center align-center px-5">
        <f-mixin-asset-logo :logo="meta.logo" :chainLogo="meta.chainLogo" />
        <div class="my-5 subtitle-1 text-center">
          {{ meta.tip }}
          <br />
          {{ meta.confirmations }}
        </div>
        <div class="error--text my-5 text-center">{{ meta.getAttention }}</div>
        <v-btn
          rounded
          depressed
          color="primary"
          :disabled="meta.persistent"
          @click="sheet = false"
        >
          {{ "Got it" }} {{ meta.timerText }}
        </v-btn>
      </v-col>
    </v-row>
  </f-bottom-sheet>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import { Asset } from "@foxone/mixin-sdk/types";
import { Getter } from "vuex-class";
import {
  GetterKeys,
  WalletModulePerfix
} from "../../store/modules/wallet/types";
import {
  BTC_ASSET_ID,
  ETHEREUM_ASSET_ID,
  EOS_ASSET_ID,
  TRON_ASSET_ID
} from "../../defaults";

@Component
class DepositWarnModal extends Vue {
  @Getter(WalletModulePerfix + GetterKeys.GET_MERGED_ASSETS)
  mergedAssets!: Asset[];

  @Prop() asset!: Asset;

  sheet = false;

  seconds = 3;

  get meta() {
    const { name, icon_url, asset_id, chain_id, confirmations } = this.asset;
    const chainAsset = this.mergedAssets.find((x) => x.asset_id === chain_id);
    return {
      persistent: this.seconds > 0,
      title: `${name} Deposit`,
      logo: icon_url,
      chainLogo: chainAsset && chainAsset.icon_url,
      tip: this.getTip(asset_id, name),
      confirmations: `Deposit will arrive after at least ${confirmations} block confirmations`,
      getAttention: this.getAttention(asset_id, name),
      timerText: (this.seconds > 0 && `(${this.seconds}S)`) || ""
    };
  }

  @Watch("asset", { immediate: true })
  handleAssetChange() {
    this.show();
    this.seconds = 3;
  }

  getAttention(id, name) {
    switch (id) {
      case EOS_ASSET_ID:
        return `Attention: Please try a small amount for the first deposit. Both a Memo and an Address are required to successfully deposit your ${name}.`;
      default:
        return `For first deposit to a new address, please try a small amount!`;
    }
  }

  getTip(id, name) {
    switch (id) {
      case BTC_ASSET_ID:
        return `This address only supports BTC and Omni USDT.`;
      case EOS_ASSET_ID:
        return `This address supports all base on EOS tokens, such as EOS, IQ, BLACK, OCT, KARMA, etc.`;
      case ETHEREUM_ASSET_ID:
        return `This address supports all ERC-20 tokens, such as ETH, XIN, TUSD, HT, LOOM, LEO, etc.`;
      case TRON_ASSET_ID:
        return `This address supports all TRC-10 and TRC-20 tokens, such as TRX, BTT, USDT-TRON, etc.`;
      default:
        return `This address only supports ${name}.`;
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

  show() {
    this.sheet = true;
    this.setupTimer();
  }
}
export default DepositWarnModal;
</script>
