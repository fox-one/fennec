<template>
  <div class="transfer">
    <f-loading v-if="loading" fullscreen />
    <div v-else class="text-center">
      <div class="title-1 page-title mb-8 hidden-sm-and-down">Transfer To</div>

      <asset-logo :size="32" :asset="asset" />

      <div class="mt-3">
        <div class="title-1">
          <span>{{ meta.amountText }}</span>
          <span class="symbol">{{ meta.assetSymbol }}</span>
        </div>

        <div class="label-1">≈ {{ meta.fiatAmountText }}</div>
      </div>

      <f-panel class="mt-8 text-left details">
        <div>
          <span class="label-1">Memo:</span>
          <span class="">{{ meta.memo }}</span>
        </div>

        <div class="mt-3">
          <span class="label-1">Mixin ID:</span>
          <span class="">{{ meta.mixinId }}</span>
        </div>
      </f-panel>

      <div class="mt-8 actions">
        <f-button
          color="white"
          min-width="120"
          class="black--text mr-3"
          :loading="rejecting"
          :disabled="meta.disabled"
          @click="handleReject"
        >
          Reject
        </f-button>
        <f-button
          color="primary"
          min-width="120"
          :loading="paying"
          :disabled="meta.disabled"
          @click="handlePay"
        >
          Pay
        </f-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { TransferReq } from "@foxone/fennec-base/state/wallet";
import { User, Asset, CreateTransferPayload } from "@foxone/mixin-api/types";
import { Component, Vue } from "vue-property-decorator";
import AssetLogo from "../asset/AssetLogo.vue";

@Component({
  components: {
    AssetLogo
  }
})
class TransferGuard extends Vue {
  loading = false;

  paying = false;

  rejecting = false;

  user: User | null = null;

  asset: Asset | null = null;

  request: TransferReq | null = null;

  get meta() {
    const requests = this.$store.state.transfer.transferRequests;
    const format = this.$utils.number.format;
    const toFiat = this.$utils.currency.toFiat;

    const assetSymbol = this.asset?.symbol ?? "";
    const price = this.asset?.price_usd ?? "0";
    const amount = this.request?.payload?.amount ?? "";
    const amountText = format({ n: amount, dp: 8 });
    const fiatAmountText = toFiat(this, { n: +amount * +price });

    return {
      requests,
      assetSymbol,
      amount,
      amountText,
      fiatAmountText,
      disabled: this.paying || this.rejecting,
      icon: this.asset?.icon_url,
      opponentId: this.request?.payload?.opponent_id,
      mixinId: this.user?.identity_number,
      assetIcon: this.asset?.icon_url,
      assetName: this.asset?.name,
      memo: this.request?.payload?.memo
    };
  }

  mounted() {
    const request = this.meta.requests[0];

    if (request) {
      this.loadTransferResource(request);
    }
  }

  handlePay() {
    this.$utils.account.confirmPassword(this, {
      onSuccess: (password: string) => this.requestTransfer(password)
    });
  }

  async handleReject() {
    this.rejecting = true;

    try {
      await this.$messages.rejectTransferReq(this.request?.id ?? "");
      this.$messages.closePopup();
    } catch (error) {
      this.$utils.helper.errorToast(this, error);
    }

    this.rejecting = false;
  }

  handleToSnapshot(id) {
    this.$router.push({
      name: "snapshot-id",
      params: { id }
    });
  }

  async requestTransfer(password: string) {
    this.paying = true;

    try {
      const payload = this.request?.payload ?? ({} as CreateTransferPayload);
      const pin = await this.$messages.getEncryptedPin(password);
      const transfer = await this.$endpoints.transfer({ ...payload, pin });

      await this.$messages.approveTransferReq(this.request?.id ?? "");
      this.handleToSnapshot(transfer.snapshot_id);
      this.$utils.asset.updateAsset(this, this.asset?.asset_id ?? "");

      this.$uikit.toast.success({ message: "Transfer successfully" });
    } catch (error) {
      this.$utils.helper.errorToast(this, error);
    }

    this.paying = false;
  }

  async loadTransferResource(request: TransferReq) {
    this.loading = true;
    this.request = request;
    await Promise.all([
      this.requestUser(request.payload.opponent_id),
      this.requestAsset(request.payload.asset_id)
    ]);
    this.loading = false;
  }

  async requestUser(userId: string) {
    try {
      const res = await this.$utils.account.getUser(this, userId);

      this.user = res;
    } catch (error) {
      this.$utils.helper.errorToast(this, error);
    }
  }

  async requestAsset(assetId: string) {
    try {
      const res = await this.$endpoints.getAsset(assetId);

      this.asset = res;
    } catch (error) {
      this.$utils.helper.errorToast(this, error);
    }
  }
}
export default TransferGuard;
</script>

<style lang="scss" scoped>
.transfer {
  width: 100%;
}

.memo {
  word-break: break-all;
}

.page-title {
  font-weight: 600;
}

.symbol {
  font-size: 14px;
}

.label-1 {
  min-width: 60px;
  font-size: 12px;
  display: inline-block;
}

.details {
  font-size: 12px;
}

.actions {
  display: flex;

  .f-btn {
    flex: 1;
    max-width: 50%;
  }
}
</style>
