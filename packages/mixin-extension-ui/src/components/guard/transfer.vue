<template>
  <v-container>
    <f-loading v-if="loading" fullscreen />
    <div v-else class="text-center">
      <div class="title ma-5 mb-2">转账给</div>
      <div class="subtitle-2 text--secondary">Mixin Id: {{ meta.mixinId }}</div>

      <f-mixin-asset-logo
        :logo="meta.assetIcon"
        :chain-logo="meta.chainIcon"
        class="my-5"
      />

      <div>
        <div class="title">{{ meta.amountText }}</div>
        <div class="caption text--secondary">≈ {{ meta.fiatAmountText }}</div>
      </div>

      <div class="my-3 memo f-body-2">
        {{ meta.memo }}
      </div>

      <v-btn
        rounded
        depressed
        min-width="200"
        color="primary"
        class="mt-5 mb-3"
        :loading="paying"
        :disabled="meta.disabled"
        @click="handlePay"
      >
        Pay
      </v-btn>
      <v-btn
        rounded
        depressed
        outlined
        min-width="200"
        color="error"
        :loading="rejecting"
        :disabled="meta.disabled"
        @click="handleReject"
      >
        Reject
      </v-btn>
    </div>
  </v-container>
</template>

<script lang="ts">
import { TransferReq } from "@foxone/mixin-extension-base/state/wallet";
import {
  User,
  Asset,
  CreateTransferPayload,
  Transfer
} from "@foxone/mixin-sdk/types";
import { Component, Vue } from "vue-property-decorator";
import { EVENTS } from "../../defaults";

@Component
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
    const currencyExchange = this.$utils.currency.currencyExchange;
    const assetSymbol = this.asset?.symbol ?? "";
    const amount = this.request?.payload?.amount ?? "";
    const amountText = `${format({ n: amount, p: 8 })} ${assetSymbol}`;
    const usdtAmount = Number(amount) * Number(this.asset?.price_usd ?? "");
    const fiatAmountText = currencyExchange(this, {
      n: usdtAmount,
      from: "USD",
      to: "USD"
    });
    const chainIcon = this.$utils.helper.getChainAssetLogo(
      this,
      this.asset?.chain_id ?? ""
    );

    return {
      requests,
      assetSymbol,
      amount,
      amountText,
      chainIcon,
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
    this.$root.$emit(EVENTS.CONFIRM_PASSWORD, {
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

  handleToSnapshot(transfer: Transfer) {
    this.$router.push({
      name: "snapshot-id",
      params: { id: transfer.snapshot_id }
    });
  }

  async requestTransfer(password: string) {
    this.paying = true;
    try {
      const payload = this.request?.payload ?? ({} as CreateTransferPayload);
      const pin = await this.$messages.getEncryptedPin(password);
      const transfer = await this.$endpoints.transfer({ ...payload, pin });
      await this.$messages.approveTransferReq(this.request?.id ?? "");
      this.$utils.helper.toast(this, {
        message: "Transfer successfully",
        color: "success"
      });
      this.handleToSnapshot(transfer);
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

<style scss scoped>
.memo {
  word-break: break-all;
}
</style>
