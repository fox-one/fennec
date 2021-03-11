<template>
  <v-container>
    <f-loading v-if="loading" :loading="loading" fullscreen />
    <f-panel v-else>
      <v-layout justify-center>
        <f-mixin-asset-logo
          size="48"
          :logo="meta.icon"
          :chain-logo="meta.chainIcon"
        />
      </v-layout>

      <v-list-item :ripple="false" class="f-bg-greyscale-6 asset mt-5 rounded">
        <span>
          <v-img width="32" height="32" :src="meta.icon" />
        </span>
        <v-list-content class="ml-3 my-3">
          <v-list-item-title>
            {{ meta.name }}
          </v-list-item-title>
          <v-list-item-subtitle class="mt-1">
            <span class="caption">{{ meta.balance }}</span>
          </v-list-item-subtitle>
        </v-list-content>
      </v-list-item>

      <amount-input-with-fiat
        v-model="amount"
        :asset="asset"
        :placeholder="`0.00 ${meta.symbol}`"
        class="mt-5"
      />

      <p class="text-center caption secondary--text mt-5">
        {{
          `A transaction fee of ${meta.fee} ${meta.feeAssetSymbol} is required for withdrawing ${meta.symbol}`
        }}
      </p>

      <v-btn
        rounded
        block
        depressed
        color="primary"
        class="mt-5"
        :disabled="!valid"
        :loading="sending"
        @click="handleSend"
      >
        Send
      </v-btn>
    </f-panel>
  </v-container>
</template>

<script lang="ts">
import {
  Address,
  Asset,
  Withdrawal,
  WithdrawPayload
} from "@foxone/mixin-sdk/types";
import { Component, Mixins } from "vue-property-decorator";
import { v4 as uuid } from "uuid";
import {
  WalletModulePerfix,
  GetterKeys
} from "../../store/modules/wallet/types";
import AmountInputWithFiat from "../../components/common/AmountInputWithFiat.vue";
import PageView from "../../mixin/page";
import { EVENTS } from "../../defaults";

@Component({
  components: {
    AmountInputWithFiat
  }
})
class WithdrawPage extends Mixins(PageView) {
  address: Address | null = null;

  asset: Asset | null = null;

  loading = false;

  sending = false;

  amount = "";

  get title() {
    if (this.address) {
      return `Send to ${this.address.label}`;
    }
    return "Send";
  }

  get assetId() {
    return this.$route.query.assetId as string;
  }

  get addressId() {
    return this.$route.query.addressId as string;
  }

  get valid() {
    return this.asset && this.address && this.amount;
  }

  get meta() {
    const format = this.$utils.number.format;
    const getAssetById = this.$store.getters[
      WalletModulePerfix + GetterKeys.GET_ASSET_BY_ID
    ];

    const icon = this.asset?.icon_url ?? "";
    const chain = this.asset?.chain_id ?? "";
    const name = this.asset?.name ?? "";
    const balance = this.asset?.balance ?? "";
    const symbol = this.asset?.symbol ?? "";
    const chainIcon = this.$utils.helper.getChainAssetLogo(this, chain);
    const fee = this.address?.fee ?? "";
    const feeAsset = getAssetById(this.asset?.asset_id ?? "");
    const feeAssetSymbol = feeAsset?.symbol ?? "";
    return {
      icon,
      name,
      symbol,
      chainIcon,
      fee,
      feeAssetSymbol,
      balance: `${format({ n: balance, p: 8 })} ${symbol}`
    };
  }

  mounted() {
    this.init();
  }

  async init() {
    this.loading = true;
    await Promise.all([this.requestAddress(), this.requestAsset()]);
    this.loading = false;
  }

  handleSend() {
    this.$root.$emit(EVENTS.CONFIRM_PASSWORD, {
      onSuccess: (password: string) => this.requestSend(password)
    });
  }

  handleToSnapshot(transfer: Withdrawal) {
    this.$router.push({
      name: "snapshot-id",
      params: { id: transfer.snapshot_id }
    });
  }

  async requestAddress() {
    try {
      this.address = await this.$endpoints.getWithdrawAddress(this.addressId);
    } catch (error) {
      this.$utils.helper.toast(this, error);
    }
  }

  async requestAsset() {
    try {
      this.asset = await this.$endpoints.getAsset(this.assetId);
      this.setProperties();
    } catch (error) {
      this.$utils.helper.errorToast(this, error);
    }
  }

  async requestSend(password: string) {
    this.sending = true;
    try {
      const pin = await this.$messages.getEncryptedPin(password);
      const opts: WithdrawPayload = {
        address_id: this.addressId,
        amount: this.amount,
        trace_id: uuid(),
        pin
      };
      const res = await this.$endpoints.withdraw(opts);
      this.handleToSnapshot(res);
    } catch (error) {
      this.$utils.helper.toast(this, error);
    }
    this.sending = false;
  }
}
export default WithdrawPage;
</script>
