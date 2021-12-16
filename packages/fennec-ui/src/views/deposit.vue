<template>
  <div class="deposit-page">
    <f-loading v-if="loading" :loading="loading" class="pa-5" />
    <template v-else>
      <asset-select v-model="asset" />

      <template v-if="asset">
        <deposit-methods :asset="asset" />

        <deposit-warn :asset="asset" />
      </template>
    </template>
  </div>
</template>

<script lang="ts">
import { Component, Mixins } from "vue-property-decorator";
import { Asset } from "@foxone/mixin-api/types";
import PageView from "../mixin/page";
import DepositWarn from "../components/deposit/DepositWarn.vue";
import DepositMethods from "../components/deposit/DepositMethods.vue";
import AssetSelect from "../components/asset/AssetSelect.vue";
import { GlobalGetters } from "../store/types";

@Component({
  components: {
    DepositMethods,
    DepositWarn,
    AssetSelect
  }
})
class DepositPage extends Mixins(PageView) {
  asset: Asset | null = null;

  loading = false;

  get appbar() {
    return {
      back: true
    };
  }

  get title() {
    return this.$t("receive");
  }

  get preset() {
    return this.$route.query.preset;
  }

  get assets(): Asset[] {
    return this.$store.state.wallet.assets;
  }

  get meta() {
    return {
      isDesktop: !this.$vuetify.breakpoint.smAndDown
    };
  }

  mounted() {
    this.setInitAsset();
  }

  async setInitAsset() {
    const getters = this.$store.getters;
    const assets: Asset[] = getters[GlobalGetters.GET_MERGED_ASSETS];
    const id = this.preset || assets[0]?.asset_id;

    if (!id) {
      return;
    }

    this.loading = true;

    try {
      const res = await this.$endpoints.getAsset(id as string);

      this.asset = res;
    } catch (error) {
      this.$utils.helper.errorToast(this, error);
    }

    this.loading = false;
  }
}
export default DepositPage;
</script>

<style lang="scss" scoped>
.deposit-page {
  padding-bottom: 140px;
}
</style>
