<template>
  <v-sheet class="address-code-wrapper">
    <f-qr-code :text="value" v-bind="$attrs" />
    <f-mixin-asset-logo
      :size="32"
      :logo="logo"
      :chain-logo="chainLogo"
      class="asset-logo"
    />
  </v-sheet>
</template>

<script lang="ts">
import { Asset } from "@foxone/mixin-api/types";
import { Component, Vue, Prop } from "vue-property-decorator";

@Component
class AssetQRCode extends Vue {
  @Prop() value!: string;

  @Prop() asset!: Asset;

  get logo() {
    return this.asset.icon_url;
  }

  get chainLogo() {
    const chain = this.$utils.helper.getChainAsset(this, this.asset.chain_id);

    return chain?.icon_url ?? "";
  }
}
export default AssetQRCode;
</script>
<style lang="scss" scoped>
.address-code-wrapper {
  position: relative;

  .asset-logo {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    box-shadow: 0px 0px 1px 3px #fff, inset 0px 0px 1px 3px #fff;
    border-radius: 18px;
    box-sizing: content-box;
  }
}

.theme--light {
  .address-code-wrapper {
    .asset-logo {
      box-shadow: 0px 0px 1px 3px #fff, inset 0px 0px 1px 3px #fff;
    }
  }
}

.theme--dark {
  .address-code-wrapper {
    .asset-logo {
      box-shadow: 0px 0px 1px 3px #000, inset 0px 0px 1px 3px #000;
    }
  }
}
</style>
