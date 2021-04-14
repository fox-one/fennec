<template>
  <v-container>
    <f-loading v-if="loading" fullscreen />
    <f-panel v-else>
      <v-layout align-center justify-center column>
        <span class="mr-3 avatar">
          <v-img width="48" height="48" :src="meta.userAvatar" />
        </span>
      </v-layout>

      <v-list-item :ripple="false" class="f-bg-greyscale-6 asset mt-5 rounded">
        <span>
          <v-img width="32" height="32" :src="meta.assetIcon" />
        </span>
        <v-list-content class="ml-3 my-3">
          <v-list-item-title>
            {{ meta.assetName }}
          </v-list-item-title>
          <v-list-item-subtitle class="mt-1">
            <span class="caption">{{ meta.balanceText }}</span>
          </v-list-item-subtitle>
        </v-list-content>
      </v-list-item>

      <amount-input-with-fiat
        v-model="amount"
        :asset="asset"
        :placeholder="`0.00 ${meta.assetSymbol}`"
        class="mt-5"
      />

      <f-input v-model="memo" label="Memo" class="mt-5" />

      <v-btn
        block
        rounded
        depressed
        color="primary"
        class="mt-5"
        :disabled="!valid"
        :loading="transfering"
        @click="handleTransfer"
      >
        Send
      </v-btn>
    </f-panel>
  </v-container>
</template>

<script lang="ts">
import {
  Asset,
  CreateTransferPayload,
  Transfer,
  User
} from "@foxone/mixin-sdk/types";
import { Component, Mixins } from "vue-property-decorator";
import { v4 as uuid } from "uuid";
import PageView from "../../mixin/page";
import AmountInputWithFiat from "../../components/common/AmountInputWithFiat.vue";

@Component({
  components: {
    AmountInputWithFiat
  }
})
class TransferPage extends Mixins(PageView) {
  user: User | null = null;

  asset: Asset | null = null;

  amount = "";

  loading = false;

  memo = "";

  transfering = false;

  get title() {
    if (this.user) {
      return `Send to ${this.user.full_name}`;
    }
    return "Send";
  }

  get opponentId() {
    return this.$route.query.opponentId as string;
  }

  get assetId() {
    return this.$route.query.assetId as string;
  }

  get valid() {
    return (
      this.assetId && this.opponentId && this.amount && Number(this.amount) > 0
    );
  }

  get meta() {
    const format = this.$utils.number.format;
    const assetSymbol = this.asset?.symbol ?? "";
    const balance = this.asset?.balance ?? "";
    const balanceText = `${format({ n: balance, p: 8 })} ${assetSymbol}`;

    return {
      userAvatar: this.user?.avatar_url,
      assetIcon: this.asset?.icon_url,
      assetName: this.asset?.name,
      balanceText,
      assetSymbol
    };
  }

  mounted() {
    this.init();
  }

  async init() {
    this.loading = true;
    await Promise.all([this.requestUser(), this.requestAsset()]);
    this.loading = false;
  }

  handleTransfer() {
    this.$utils.account.confirmPassword(this, {
      onSuccess: (password: string) => this.requestTransfer(password)
    });
  }

  handleToSnapshot(transfer: Transfer) {
    this.$router.push({
      name: "snapshot-id",
      params: { id: transfer.snapshot_id }
    });
  }

  async requestUser() {
    try {
      const res = await this.$utils.account.getUser(this, this.opponentId);
      this.user = res;
      this.setProperties();
    } catch (error) {
      this.$utils.helper.errorToast(this, error);
    }
  }

  async requestAsset() {
    try {
      const res = await this.$endpoints.getAsset(this.assetId);
      this.asset = res;
    } catch (error) {
      this.$utils.helper.errorToast(this, error);
    }
  }

  async requestTransfer(password: string) {
    this.transfering = true;
    try {
      const pin = await this.$messages.getEncryptedPin(password);
      const opts: CreateTransferPayload = {
        asset_id: this.asset?.asset_id ?? "",
        opponent_id: this.opponentId,
        amount: this.amount,
        memo: this.memo,
        trace_id: uuid(),
        pin
      };
      const transfer = await this.$endpoints.transfer(opts);
      this.handleToSnapshot(transfer);
    } catch (error) {
      this.$utils.helper.errorToast(this, error);
    }
    this.transfering = false;
  }
}
export default TransferPage;
</script>

<style lang="scss" scoped>
.avatar {
  border-radius: 48px;
  overflow: hidden;
}

.asset {
  &::before {
    display: none !important;
  }
}
</style>
