<template>
  <page-warning ref="warning" color="#BBB7CC">
    {{ $t("deposit.warning") }}
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
      title: this.$t("deposit.title", { name }),
      logo: icon_url,
      chainLogo: chainAsset && chainAsset.icon_url,
      tip: this.getTip(chain_id, name),
      confirmations: this.$t("deposit.confirmations", { confirmations }),
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
        return this.$t("deposit.attention.eos", { name });
      default:
        return this.$t("deposit.attention.try");
    }
  }

  getTip(id, name) {
    switch (id) {
      case BTC_ASSET_ID:
        return this.$t("deposit.tip.btc");
      case EOS_ASSET_ID:
        return this.$t("deposit.tip.eos");
      case ETHEREUM_ASSET_ID:
        return this.$t("deposit.tip.eth");
      case TRON_ASSET_ID:
        return this.$t("deposit.tip.tron");
      default:
        return this.$t("deposit.tip.default", { name });
    }
  }
}
export default DepositWarnModal;
</script>
