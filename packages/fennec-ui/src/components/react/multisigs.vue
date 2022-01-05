<template>
  <div>
    <f-loading v-if="loading" fullscreen />
    <div v-else class="text-center">
      <div class="title-1 page-title mb-8 hidden-sm-and-down">
        {{ $t("multisi.transaction") }}
      </div>

      <asset-logo :size="64" :asset="asset" />

      <div class="mt-3">
        <div class="title-1">
          <span>{{ meta.amountText }}</span>
          <span class="symbol">{{ meta.assetSymbol }}</span>
        </div>

        <div class="label-1">≈ {{ meta.fiatAmountText }}</div>
      </div>

      <f-panel class="mt-8 text-left details">
        <div class="detail-item">
          <span class="label-1">{{ $t("memo") }}:</span>
          <span class="detail-value">
            {{ meta.memo }}
          </span>
        </div>

        <div class="mt-3 detail-item">
          <span class="label-1">{{ $t("receiver") }}:</span>

          <div class="avatars">
            <account-avatar :size="24" :url="meta.mineIcon" />
            <v-icon class="mx-2" size="20"> $IconLinkTo </v-icon>
            <account-avatars
              :urls="meta.receiversIcons"
              :users="users"
              :title="meta.title"
            />
          </div>
        </div>
      </f-panel>

      <account-switch>
        <template #activator="{ on }">
          <f-panel class="mt-4 text-left details" v-on="on">
            <div class="detail-item d-flex">
              <span class="label-1">{{ $t("account") }}:</span>
              <span class="detail-value">{{ meta.name }}</span>
              <v-spacer />
              <v-icon size="16">$FIconChevronRight</v-icon>
            </div>
          </f-panel>
        </template>
      </account-switch>

      <div class="mt-8 actions">
        <f-button
          color="white"
          min-width="120"
          class="black--text mr-3"
          :loading="rejecting"
          :disabled="meta.disabled"
          @click="handleReject"
        >
          {{ $t("reject") }}
        </f-button>
        <f-button
          color="primary"
          min-width="120"
          :loading="paying"
          :disabled="meta.disabled"
          @click="handlePay"
        >
          {{ $t("pay") }}
        </f-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { RawTransactionReq } from "@foxone/fennec-base/state/wallet";
import { Asset, User } from "@foxone/mixin-api/types";
import { Component, Vue } from "vue-property-decorator";
import AccountAvatar from "../account/AccountAvatar.vue";
import AccountAvatars from "../account/AccountAvatars.vue";
import AccountSwitch from "../account/AccountSwitch.vue";
import AssetLogo from "../asset/AssetLogo.vue";
import { GlobalGetters } from "../../store/types";

@Component({
  components: {
    AccountAvatar,
    AccountAvatars,
    AccountSwitch,
    AssetLogo
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
    const transactions: RawTransactionReq =
      this.$store.state.multisigs.transactionRequests;
    const me = this.$store.state.wallet.me;

    const format = this.$utils.number.format;
    const toFiat = this.$utils.currency.toFiat;

    const assetIcon = this.asset?.icon_url;
    const assetSymbol = this.asset?.symbol;

    const amount = this.transactionReq?.payload.amount ?? "";
    const price = this.asset?.price_usd ?? "0";
    const amountText = format({ n: amount, dp: 8 });
    const usdtAmount = +amount * +price;
    const fiatAmountText = toFiat(this, { n: usdtAmount });
    const memo = this.transactionReq?.payload.memo;
    const receiversIcons = this.users.map((x) => x?.avatar_url);
    const mineIcon = me?.avatar_url;
    const disabled = this.paying || this.rejecting;
    const threshold = this.transactionReq?.payload.threshold;
    const total = this.users.length;
    const title = `${this.$t("receivers")} (${threshold}/${total})`;

    const currentProfile = this.$store.getters[GlobalGetters.CURRENT_PROFILE];
    const name = currentProfile?.full_name ?? "";

    return {
      title,
      transactions,
      assetIcon,
      assetSymbol,
      amountText,
      fiatAmountText,
      memo,
      mineIcon,
      receiversIcons,
      disabled,
      threshold,
      total,
      name
    };
  }

  mounted() {
    const transaction = this.meta.transactions[0];

    if (transaction) {
      this.requestTransactionResources(transaction);
    }
  }

  handlePay() {
    this.$utils.account.confirmPassword(this, {
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

  handleToSnapshot(id) {
    this.$router.push({
      name: "snapshot-id",
      params: { id }
    });
  }

  async requestPay(password: string) {
    if (!this.transactionReq) return;
    this.paying = true;

    try {
      const { amount, asset_id, memo, receivers, threshold, trace_id } =
        this.transactionReq.payload;
      const pin = await this.$messages.getEncryptedPin(password);
      // TODO: add post transaction resp types
      const resp: any = await this.$endpoints.transactions({
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

      this.$utils.asset.updateAsset(this, this.asset?.asset_id ?? "");
      this.$uikit.toast.success({
        message: this.$t("message.pay.successfully") as string
      });
    } catch (error) {
      this.$utils.helper.errorToast(this, error);
    }

    this.paying = false;
  }

  async requestTransactionResources(transactionReq: RawTransactionReq) {
    const transaction = transactionReq.payload;
    const { asset_id, receivers } = transaction;

    this.transactionReq = transactionReq;
    this.loading = true;

    try {
      const asset = await this.$endpoints.getAsset(asset_id);
      const users = await Promise.all(
        receivers.map(async (x) => await this.$utils.account.getUser(this, x))
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

  .detail-item {
    display: flex;
    align-items: center;
  }

  .detail-value {
    word-break: break-all;
  }
}

.avatars {
  display: flex;
  align-items: center;
  justify-content: center;
}

.actions {
  display: flex;

  .f-btn {
    flex: 1;
    max-width: 50%;
  }
}
</style>
