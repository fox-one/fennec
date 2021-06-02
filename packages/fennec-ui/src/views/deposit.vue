<template>
  <v-container>
    <f-loading v-if="loading" :loading="loading" fullscreen />
    <f-panel v-else>
      <asset-select v-model="asset" />

      <v-layout justify-center>
        <f-button-tabs v-model="index" class="mt-10">
          <template #tabs>
            <v-btn
              v-for="(item, index) in meta.tabs"
              :key="index"
              :value="index"
              :ripple="false"
            >
              <span>{{ item.text }}</span>
            </v-btn>
          </template>
        </f-button-tabs>
      </v-layout>

      <template v-if="asset">
        <deposit-by-address v-if="index === 0" :asset="asset" />
        <deposit-by-transfer v-else :asset="asset" />

        <deposit-warn-modal :asset="asset" />
      </template>
    </f-panel>
  </v-container>
</template>

<script lang="ts">
import { Component, Mixins } from "vue-property-decorator";
import { Asset } from "@foxone/mixin-api/types";
import PageView from "../mixin/page";
import DepositByAddress from "../components/wallet/DepositByAddress.vue";
import DepositByTransfer from "../components/wallet/DepositByTransfer.vue";
import DepositWarnModal from "../components/wallet/DepositWarnModal.vue";
import AssetSelect from "../components/wallet/AssetSelect.vue";

@Component({
  components: {
    DepositByAddress,
    DepositByTransfer,
    DepositWarnModal,
    AssetSelect
  }
})
class DepositPage extends Mixins(PageView) {
  asset: Asset | null = null;

  loading = false;

  index = 0;

  get appbar() {
    return {
      back: true
    };
  }

  get title() {
    return "Deposit";
  }

  get preset() {
    return this.$route.query.preset;
  }

  get assets(): Asset[] {
    return this.$store.state.wallet.assets;
  }

  get meta() {
    const tabs = [
      {
        text: "Address",
        value: "address"
      },
      {
        text: "QRCode",
        value: "qrcode"
      }
    ];

    return { tabs };
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
