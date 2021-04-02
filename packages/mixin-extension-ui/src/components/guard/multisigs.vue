<template>
  <v-container>
    <f-loading v-if="loading" fullscreen />
    <div v-else class="text-center">
      <div class="title ma-5 mb-2">多重签名交易</div>
      <div class="mx-5 mb-2 memo text--secondary">
        {{ meta.memo }}
      </div>
      <div class="avatars">
        <div>
          <account-avatar :url="meta.mineIcon" size="32" />
        </div>
        <v-icon small color="primary">
          {{ $icons.mdiChevronRight }}
        </v-icon>
        <account-avatars :urls="meta.receiversIcons" :users="users">
          <template #title>
            Receivers ({{ meta.threshold }}/{{ meta.total }})
          </template>
        </account-avatars>
      </div>
      <f-mixin-asset-logo
        :logo="meta.assetIcon"
        :chain-logo="meta.chainIcon"
        class="my-5"
      />
      <div class="title">
        {{ meta.amountText }}
      </div>
      <div class="caption text--secondary">≈ {{ meta.fiatAmountText }}</div>

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
import { RawTransactionReq } from "@foxone/mixin-extension-base/state/wallet";
import { Asset, User } from "@foxone/mixin-sdk/types";
import { Component, Vue } from "vue-property-decorator";
import { EVENTS } from "../../defaults";
import AccountAvatar from "../account/AccountAvatar.vue";
import AccountAvatars from "../account/AccountAvatars.vue";

@Component({
  components: {
    AccountAvatar,
    AccountAvatars
  }
})
class MultisigsGuard extends Vue {
  loading = false;

  paying = false;

  rejecting = false;

  users: User[] = [];

  asset: Asset | null = null;

  transactionReq: RawTransactionReq | null = null;

  get meta() {
    const transactions: RawTransactionReq = this.$store.state.multisigs
      .transactionRequests;
    const me = this.$store.state.wallet.me;
    const getChainAssetLogo = this.$utils.helper.getChainAssetLogo;
    const format = this.$utils.number.format;
    const currencyExchange = this.$utils.currency.currencyExchange;

    const assetIcon = this.asset?.icon_url;
    const assetSymbol = this.asset?.symbol;
    const chainIcon = getChainAssetLogo(this, this.asset?.chain_id ?? "");
    const amount = this.transactionReq?.payload.amount ?? "";
    const amountText = `${format({ n: amount, p: 8 })} ${assetSymbol}`;
    const usdtAmount = Number(amount) * Number(this.asset?.price_usd ?? "");
    const fiatAmountText = currencyExchange(this, {
      n: usdtAmount,
      from: "USD",
      to: "USD"
    });
    const memo = this.transactionReq?.payload.memo;
    const receiversIcons = this.users.map((x) => x.avatar_url);
    const mineIcon = me?.avatar_url;
    const disabled = this.paying || this.rejecting;
    const threshold = this.transactionReq?.payload.threshold;
    const total = this.users.length;

    return {
      transactions,
      assetIcon,
      chainIcon,
      amountText,
      fiatAmountText,
      memo,
      mineIcon,
      receiversIcons,
      disabled,
      threshold,
      total
    };
  }

  mounted() {
    const transaction = this.meta.transactions[0];
    if (transaction) {
      this.requestTransactionResources(transaction);
    }
  }

  handlePay() {
    this.$root.$emit(EVENTS.CONFIRM_PASSWORD, {
      onSuccess: (password: string) => this.requestPay(password)
    });
  }

  async handleReject() {
    this.rejecting = true;
    try {
      await this.$messages.rejectMultisigsTransactionReq(
        this.transactionReq?.id ?? ""
      );
    } catch (error) {
      this.$utils.helper.errorToast(this, error);
    }
    this.rejecting = false;
  }

  handleToSnapshot(id: string) {
    this.$router.push({
      name: "snapshot-id",
      params: { id }
    });
  }

  async requestPay(password: string) {
    if (!this.transactionReq) return;
    this.paying = true;
    try {
      const {
        amount,
        asset_id,
        receivers,
        trace_id,
        threshold,
        memo
      } = this.transactionReq.payload;
      const pin = await this.$messages.getEncryptedPin(password);
      const resp = await this.$endpoints.transactions({
        asset_id,
        amount,
        trace_id,
        pin,
        memo,
        opponent_multisig: {
          receivers,
          threshold
        }
      });
      await this.$messages.approveMultisigsTransactionReq(
        this.transactionReq.id
      );
      this.handleToSnapshot(resp.snapshot_id);
    } catch (error) {
      this.$utils.helper.errorToast(this, error);
    }
    this.paying = false;
  }

  async requestTransactionResources(transactionReq: RawTransactionReq) {
    const transaction = transactionReq.payload;
    const { receivers, asset_id } = transaction;
    this.transactionReq = transactionReq;
    this.loading = true;
    try {
      const asset = await this.$endpoints.getAsset(asset_id);
      const users = await Promise.all(
        receivers.map(async (x) => await this.$endpoints.getUser(x))
      );
      this.asset = asset;
      this.users = users;
    } catch (error) {
      this.$utils.helper.errorToast(this, error);
    }
    this.loading = false;
  }
}
export default MultisigsGuard;
</script>

<style lang="scss" scoped>
.memo {
  word-break: break-all;
}

.avatars {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
