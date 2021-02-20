<template>
  <v-container>
    <f-loading v-if="loading" :loading="loading" fullscreen />
    <div v-else>
      <div class="f-caption my-3">Withdraw</div>
      <asset-select v-model="asset" />
      <v-layout class="f-caption mt-5" align-center>
        <v-flex>Opponent</v-flex>
        <v-btn text small color="primary">
          <span class="f-caption">use contact</span>
        </v-btn>
      </v-layout>
      <address-list v-if="asset" :asset="meta.asset" :address.sync="address" />
    </div>
  </v-container>
</template>

<script lang="ts">
import { Asset } from "@foxone/mixin-sdk/types";
import { Component, Mixins } from "vue-property-decorator";
import PageView from "../mixin/page";
import AddressList from "../components/wallet/AddressList.vue";
import AssetSelect from "../components/wallet/AssetSelect.vue";

@Component({
  components: {
    AddressList,
    AssetSelect
  }
})
class WithdrawPage extends Mixins(PageView) {
  asset: Asset | null = null;

  address = "";

  loading = false;

  precision = 8;

  amount = "";

  get appbar() {
    return {
      back: true
    };
  }

  get title() {
    return "Withdraw";
  }

  get preset() {
    return this.$route.query.preset;
  }

  get meta() {
    const assets: Asset[] = this.$store.state.wallet.assets;
    const fmtAssets = assets.map((x) =>
      this.$utils.helper.convertToListAsset(this, x)
    );
    const asset = assets.find((x) => x.asset_id === this.asset?.asset_id);
    return {
      assets: fmtAssets,
      asset
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
}
export default WithdrawPage;
</script>

<style lang="scss" scoped>
::v-deep {
  .asset-select {
    border-radius: 5px;
    background-color: rgba(0, 0, 0, 0.03);
  }
}
</style>
