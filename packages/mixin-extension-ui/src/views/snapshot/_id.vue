<template>
  <v-container>
    <f-loading v-if="loading" :loading="loading" fullscreen />
    <f-panel v-else>
      <v-layout align-center justify-center column>
        <span class="mr-3">
          <f-mixin-asset-logo
            :size="48"
            :logo="meta.icon"
            :chain-logo="meta.chainIcon"
          />
        </span>
        <div class="mt-3">
          <span class="f-headline" :style="{ color: meta.amountColor }">
            {{ meta.amountFormat }}
          </span>
          <span>
            {{ meta.symbol }}
          </span>
        </div>
        <div class="f-body-2 text--secondary">
          <span>value now: </span>
          <span>{{ meta.fiatFormat }}</span>
        </div>
        <div class="f-body-2 text--secondary">
          <span>value then: </span>
          <span>{{ meta.createdFiatFormat }}</span>
        </div>
      </v-layout>

      <div class="mt-5">
        <div
          v-clipboard:copy="meta.id"
          v-clipboard:success="() => $utils.helper.onCopySuccess(this)"
          v-clipboard:error="() => $utils.helper.onCopyFail(this)"
        >
          <div class="f-caption text--secondary mb-1">Transaction Id</div>
          <div class="field">{{ meta.id }}</div>
        </div>
        <v-divider class="my-2" />

        <div>
          <div class="f-caption text--secondary mb-1">Transaction Type</div>
          <div class="field">{{ meta.typeText }}</div>
        </div>
        <v-divider class="my-2" />

        <div v-if="meta.opponent">
          <div
            v-clipboard:copy="meta.opponent"
            v-clipboard:success="() => $utils.helper.onCopySuccess(this)"
            v-clipboard:error="() => $utils.helper.onCopyFail(this)"
          >
            <div class="f-caption text--secondary mb-1">Opponent</div>
            <div class="field">{{ meta.opponent }}</div>
          </div>
          <v-divider class="my-2" />
        </div>

        <div v-if="meta.opponentId">
          <div
            v-clipboard:copy="meta.opponentId"
            v-clipboard:success="() => $utils.helper.onCopySuccess(this)"
            v-clipboard:error="() => $utils.helper.onCopyFail(this)"
          >
            <div class="f-caption text--secondary mb-1">Opponent Id</div>
            <div class="field">{{ meta.opponentId }}</div>
          </div>
          <v-divider class="my-2" />
        </div>

        <div v-if="meta.sender">
          <div
            v-clipboard:copy="meta.sender"
            v-clipboard:success="() => $utils.helper.onCopySuccess(this)"
            v-clipboard:error="() => $utils.helper.onCopyFail(this)"
          >
            <div class="f-caption text--secondary mb-1">Sender</div>
            <div class="field">{{ meta.sender }}</div>
          </div>
          <v-divider class="my-2" />
        </div>

        <div
          v-clipboard:copy="meta.memo"
          v-clipboard:success="() => $utils.helper.onCopySuccess(this)"
          v-clipboard:error="() => $utils.helper.onCopyFail(this)"
        >
          <div class="f-caption text--secondary mb-1">Memo</div>
          <div class="field">{{ meta.memo || "-" }}</div>
        </div>
        <v-divider class="my-2" />

        <div>
          <div class="f-caption text--secondary mb-1">Date</div>
          <div class="field">{{ meta.date }}</div>
        </div>
      </div>
    </f-panel>
  </v-container>
</template>

<script lang="ts">
import {
  WalletModulePerfix,
  ActionTypes
} from "../../store/modules/wallet/types";
import { Asset, Snapshot, Ticker } from "@foxone/mixin-sdk/types";
import { Component, Mixins } from "vue-property-decorator";
import PageView from "../../mixin/page";

@Component
class SnapshotPage extends Mixins(PageView) {
  loading = false;

  snapshot: Snapshot | null = null;

  createdPrice: Ticker | null = null;

  opponent = "";

  get title() {
    return "Snapshot";
  }

  get id() {
    return this.$route.params.id;
  }

  get meta() {
    const formatNumber = this.$utils.number.format;
    // const addSymbol = this.$utils.number.addSymbol;
    const currencyExchange = this.$utils.currency.currencyExchange;
    const snapshotTypeMetas = this.$utils.enums.snapshotTypeMetas(this);
    const getValueColor = this.$utils.color.getValueColor;
    const formatDate = this.$utils.time.format;

    const assets: Asset[] = this.$store.state.wallet.assets;
    const asset = assets.find((x) => x.asset_id === this.snapshot?.asset_id);
    const icon = asset?.icon_url ?? "";
    const symbol = asset?.symbol ?? "";
    const amount = this.snapshot?.amount ?? "";
    const opponentId = this.snapshot?.opponent_id ?? "";
    const chainIcon = this.$utils.helper.getChainAssetLogo(
      this,
      asset?.chain_id ?? ""
    );
    const fiatAmount = Math.abs(Number(amount)) * Number(asset?.price_usd);
    const createdFiatAmount =
      Math.abs(Number(amount)) * Number(this.createdPrice?.price_usd ?? 0);
    const snapshotMeta = snapshotTypeMetas[this.snapshot?.type ?? ""];
    const formatAmount = formatNumber({ n: amount });
    const amountFormat = `${Number(amount) > 0 ? "+" : ""} ${formatAmount}`;
    const fiatFormat = currencyExchange(this, {
      n: fiatAmount,
      from: "USD",
      to: "USD"
    });
    const createdFiatFormat = currencyExchange(this, {
      n: createdFiatAmount,
      from: "USD",
      to: "USD"
    });

    return {
      icon,
      symbol,
      chainIcon,
      amountFormat,
      fiatFormat,
      createdFiatFormat,
      sender: this.snapshot?.sender,
      amountColor: getValueColor(this, amount),
      id: this.snapshot?.snapshot_id,
      typeText: snapshotMeta?.text ?? "-",
      memo: this.snapshot?.memo ?? "",
      date: formatDate({
        t: this.snapshot?.created_at ?? "",
        p: "YYYY-MM-DD HH:mm:ss"
      }),
      opponent: this.opponent || opponentId,
      opponentId: opponentId
    };
  }

  async mounted() {
    await this.requestSnapshotDetail();
    await this.requestCreatedTicker();
  }

  async requestSnapshotDetail() {
    this.loading = true;
    try {
      const res = await this.$endpoints.getSnapshot(this.id);
      this.snapshot = res;
      this.requestOpponent();
    } catch (error) {
      this.$utils.helper.errorToast(this, error);
    }
    this.loading = false;
  }

  async requestOpponent() {
    const user = await this.$store.dispatch(
      WalletModulePerfix + ActionTypes.LOAD_USER,
      { id: this.snapshot?.opponent_id }
    );
    this.opponent = user.full_name;
  }

  async requestCreatedTicker() {
    if (!this.snapshot) {
      return;
    }
    try {
      const res = await this.$endpoints.ticker({
        asset: this.snapshot?.asset_id,
        offset: this.snapshot.created_at
      });
      this.createdPrice = res;
    } catch (error) {
      this.$utils.helper.errorToast(this, error);
    }
  }
}
export default SnapshotPage;
</script>

<style lang="scss" scoped>
.field {
  word-break: break-all;
  font-size: 14px;
}
</style>
