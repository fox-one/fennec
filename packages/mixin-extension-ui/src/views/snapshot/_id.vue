<template>
  <v-container>
    <f-loading v-if="loading" :loading="loading" fullscreen />
    <div v-else>
      <v-layout align-center justify-center column>
        <span class="mr-3">
          <v-img width="38" height="38" :src="meta.icon" />
        </span>
        <div class="f-headline mt-3">{{ meta.amountFormat }}</div>
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
        <div>
          <div class="f-caption text--secondary">Transaction Id</div>
          <div>{{ meta.id }}</div>
        </div>

        <div class="mt-4">
          <div class="f-caption text--secondary">Transaction Type</div>
          <div>{{ meta.typeText }}</div>
        </div>

        <div class="mt-4">
          <div class="f-caption text--secondary">Sender</div>
        </div>

        <div class="mt-4">
          <div class="f-caption text--secondary">Recevier</div>
        </div>

        <div class="mt-4">
          <div class="f-caption text--secondary">Memo</div>
          <div>{{ meta.memo }}</div>
        </div>

        <div class="mt-4">
          <div class="f-caption text--secondary">Date</div>
          <div>{{ meta.date }}</div>
        </div>
      </div>
    </div>
  </v-container>
</template>

<script lang="ts">
import { Asset, Snapshot, Ticker } from "@foxone/mixin-sdk/types";
import { Component, Mixins } from "vue-property-decorator";
import PageView from "../../mixin/page";

@Component
class SnapshotPage extends Mixins(PageView) {
  loading = false;

  snapshot: Snapshot | null = null;

  createdPrice: Ticker | null = null;

  get title() {
    return "Snapshot";
  }

  get id() {
    return this.$route.params.id;
  }

  get meta() {
    const addSymbol = this.$utils.number.addSymbol;
    const currencyExchange = this.$utils.currency.currencyExchange;
    const snapshotTypeMetas = this.$utils.enums.snapshotTypeMetas(this);
    const formatDate = this.$utils.time.format;

    const assets: Asset[] = this.$store.state.wallet.assets;
    const asset = assets.find((x) => x.asset_id === this.snapshot?.asset_id);
    const icon = asset?.icon_url ?? "";
    const symbol = asset?.symbol ?? "";
    const amount = this.snapshot?.amount ?? "";
    const fiatAmount = Math.abs(Number(amount)) * Number(asset?.price_usd);
    const createdFiatAmount =
      Math.abs(Number(amount)) * Number(this.createdPrice?.price_usd ?? 0);
    const snapshotMeta = snapshotTypeMetas[this.snapshot?.type ?? ""];

    const amountFormat = `${addSymbol(amount)} ${symbol}`;
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
      amountFormat,
      fiatFormat,
      createdFiatFormat,
      id: this.snapshot?.snapshot_id,
      typeText: snapshotMeta?.text ?? "-",
      memo: this.snapshot?.memo ?? "",
      date: formatDate({
        t: this.snapshot?.created_at ?? "",
        p: "YYYY-MM-DD HH:mm:ss"
      })
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
    } catch (error) {
      this.$utils.helper.errorToast(this, error);
    }
    this.loading = false;
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
