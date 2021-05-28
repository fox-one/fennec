<template>
  <v-container>
    <f-loading v-if="loading" :loading="loading" fullscreen />
    <f-panel v-else>
      <div class="f-caption my-3">Deposit</div>
      <asset-select v-model="asset" />

      <div v-if="meta.tag" class="caption text--secondary mt-5">
        Step 1: Copy Address
      </div>
      <div v-if="meta.destination" class="mb-5 mt-1">
        <div class="f-caption my-3">Address</div>
        <v-layout>
          <v-flex class="destination">
            <div class="mr-5 f-body-2">{{ meta.destination }}</div>
            <div class="my-3">
              <v-btn
                v-clipboard:copy="meta.destination"
                v-clipboard:success="() => $utils.helper.onCopySuccess(this)"
                v-clipboard:error="() => $utils.helper.onCopyFail(this)"
                small
                depressed
                rounded
                color="primary"
              >
                Copy
              </v-btn>
            </div>
          </v-flex>
          <div class="qr-code">
            <asset-qr-code :value="meta.destination" :asset="asset" />
          </div>
        </v-layout>
      </div>

      <div v-if="meta.tag" class="caption text--secondary">
        Step 2: Copy Memo
      </div>
      <div v-if="meta.tag" class="mb-5 mt-1">
        <div class="f-caption my-3">Memo</div>
        <v-layout>
          <v-flex class="tag">
            <div class="mr-5 f-body-2">{{ meta.tag }}</div>
            <div class="my-3">
              <v-btn
                v-clipboard:copy="meta.tag"
                v-clipboard:success="() => $utils.helper.onCopySuccess(this)"
                v-clipboard:error="() => $utils.helper.onCopyFail(this)"
                small
                depressed
                rounded
                color="primary"
              >
                Copy
              </v-btn>
            </div>
          </v-flex>
          <div class="qr-code">
            <asset-qr-code :value="meta.tag" :asset="asset" />
          </div>
        </v-layout>
      </div>
      <deposit-warn-modal v-if="asset" :asset="asset" />
    </f-panel>
  </v-container>
</template>

<script lang="ts">
import { Component, Mixins } from "vue-property-decorator";
import { Asset } from "@foxone/mixin-api/types";
import PageView from "../mixin/page";
import AssetSelect from "../components/wallet/AssetSelect.vue";
import AssetQRCode from "../components/wallet/AssetQRCode.vue";
import DepositWarnModal from "../components/wallet/DepositWarnModal.vue";

@Component({
  components: {
    AssetSelect,
    DepositWarnModal,
    "asset-qr-code": AssetQRCode
  }
})
class DepositPage extends Mixins(PageView) {
  asset: Asset | null = null;

  loading = false;

  get appbar() {
    return {
      back: true
    };
  }

  get title() {
    return "Deposit";
  }

  get meta() {
    return {
      destination: this.asset?.destination ?? "",
      tag: this.asset?.tag ?? "",
      symbol: this.asset?.symbol ?? "",
      confirmations: this.asset?.destination ?? ""
    };
  }

  get preset() {
    return this.$route.query.preset;
  }

  get assets(): Asset[] {
    return this.$store.state.wallet.assets;
  }

  mounted() {
    this.setInitAsset();
  }

  async setInitAsset() {
    if (!this.preset) {
      return;
    }

    this.loading = true;

    try {
      const res = await this.$endpoints.getAsset(this.preset as string);

      this.asset = res;
    } catch (error) {
      this.$utils.helper.errorToast(this, error);
    }

    this.loading = false;
  }
}
export default DepositPage;
</script>

<style lang="scss" scoped>
.destination {
  font-size: 16px;
  line-height: 1.2;
  word-break: break-all;
}

.qr-code {
  min-width: 80px;
}

.tag,
.destination {
  max-width: calc(100% - 130px);
  word-break: break-all;
}
</style>
