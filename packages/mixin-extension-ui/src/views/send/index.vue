<template>
  <v-container>
    <f-loading v-if="loading" :loading="loading" fullscreen />
    <f-panel v-else>
      <div class="f-caption my-3">Withdraw</div>
      <asset-select v-model="asset" />

      <template v-if="asset">
        <v-layout class="f-caption mt-5" align-center>
          <v-flex>Opponent</v-flex>
          <v-btn text small color="primary" @click="handleToggleMethod">
            <span class="f-caption" v-if="!useAdderss">tranfer to address</span>
            <span class="f-caption" v-else>transfer to contact</span>
          </v-btn>
        </v-layout>
        <template v-if="useAdderss">
          <address-list
            v-if="asset"
            :asset="meta.asset"
            :address.sync="address"
          />
        </template>
        <template v-else>
          <user-search :user.sync="user" class="mt-5" />
        </template>
      </template>

      <v-btn
        block
        depressed
        rounded
        color="primary"
        class="mt-5"
        :disabled="disabled"
        @click="handleNext"
      >
        Next
      </v-btn>
    </f-panel>
  </v-container>
</template>

<script lang="ts">
import { Address, Asset, User } from "@foxone/mixin-sdk/types";
import { Component, Mixins } from "vue-property-decorator";
import PageView from "../../mixin/page";
import AddressList from "../../components/wallet/AddressList.vue";
import AssetSelect from "../../components/wallet/AssetSelect.vue";
import UserSearch from "../../components/wallet/UserSearch.vue";

@Component({
  components: {
    AddressList,
    AssetSelect,
    UserSearch
  }
})
class SendPage extends Mixins(PageView) {
  asset: Asset | null = null;

  address: Address | null = null;

  user: User | null = null;

  loading = false;

  useAdderss = true;

  precision = 8;

  amount = "";

  get appbar() {
    return {
      back: true
    };
  }

  get title() {
    return "Send";
  }

  get preset() {
    return this.$route.query.preset;
  }

  get disabled() {
    if (!this.asset) {
      return true;
    }
    return !this.address && !this.user;
  }

  get meta() {
    const assets: Asset[] = this.$store.state.wallet.assets;
    const fmtAssets = assets.map((x) =>
      this.$utils.helper.convertToListAsset(this, x)
    );
    const asset = assets.find((x) => x.asset_id === this.asset?.asset_id);
    return {
      asset,
      assets: fmtAssets
    };
  }

  mounted() {
    this.init();
  }

  async init() {
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

  handleToggleMethod() {
    this.useAdderss = !this.useAdderss;
  }

  handleNext() {
    const assetId = this.asset?.asset_id;
    if (this.useAdderss) {
      const addressId = this.address?.address_id;
      this.$router.push({
        name: "send-withdraw",
        query: { assetId, addressId }
      });
    } else {
      const opponentId = this.user?.user_id;
      this.$router.push({
        name: "send-transfer",
        query: { assetId, opponentId }
      });
    }
  }
}
export default SendPage;
</script>

<style lang="scss" scoped></style>
