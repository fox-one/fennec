<template>
  <page-warning ref="warning" color="#BBB7CC">
    For first deposit to a new address, please try a small amount!
    <br />
    <br />
    {{ meta.tip }}
    <br />
    <br />
    {{ meta.confirmations }}
  </page-warning>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import { Asset } from "@foxone/mixin-api/types";
import { Getter } from "vuex-class";
import { GlobalGetters } from "../../store/types";
import {
  BTC_ASSET_ID,
  ETHEREUM_ASSET_ID,
  EOS_ASSET_ID,
  TRON_ASSET_ID
} from "../../defaults";

@Component
class DepositWarnModal extends Vue {
  @Getter(GlobalGetters.GET_MERGED_ASSETS)
  mergedAssets!: Asset[];

  @Prop() asset!: Asset;

  get meta() {
    const { asset_id, chain_id, confirmations, icon_url, name } = this.asset;
    const chainAsset = this.mergedAssets.find((x) => x.asset_id === chain_id);

    return {
      title: `${name} Deposit`,
      logo: icon_url,
      chainLogo: chainAsset && chainAsset.icon_url,
      tip: this.getTip(chain_id, name),
      confirmations: `Deposit will arrive after at least ${confirmations} block confirmations`,
      getAttention: this.getAttention(asset_id, name)
    };
  }

  @Watch("asset")
  handleAssetChange() {
    const warning = this.$refs.warning as any;

    warning.show();
  }

  getAttention(id, name) {
    switch (id) {
      case EOS_ASSET_ID:
        return `Attention: Please try a small amount for the first deposit. Both a Memo and an Address are required to successfully deposit your ${name}.`;
      default:
        return "For first deposit to a new address, please try a small amount!";
    }
  }

  getTip(id, name) {
    switch (id) {
      case BTC_ASSET_ID:
        return "This address only supports BTC and Omni USDT.";
      case EOS_ASSET_ID:
        return "This address supports all base on EOS tokens, such as EOS, IQ, BLACK, OCT, KARMA, etc.";
      case ETHEREUM_ASSET_ID:
        return "This address supports all ERC-20 tokens, such as ETH, XIN, TUSD, HT, LOOM, LEO, etc.";
      case TRON_ASSET_ID:
        return "This address supports all TRC-10 and TRC-20 tokens, such as TRX, BTT, USDT-TRON, etc.";
      default:
        return `This address only supports ${name}.`;
    }
  }
}
export default DepositWarnModal;
</script>
