<template>
  <div>
    <f-loading v-if="loading" :loading="loading" fullscreen />
    <div v-else>
      <action-field icon="$FIconAdd" @click.native="handleCreateAddress">
        {{ $t("address.new.symbol", { symbol: meta.symbol }) }}
      </action-field>

      <address-list :asset-id="assetId" class="mt-5" />
    </div>
  </div>
</template>

<script lang="ts">
import { GlobalGetters } from "@foxone/fennec-ui/store/types";
import { Asset } from "@foxone/mixin-api/types";
import { Component, Mixins } from "vue-property-decorator";
import PageView from "../../mixin/page";
import AddressList from "../../components/send/AddressList.vue";

@Component({
  components: {
    AddressList
  }
})
class AddressSelect extends Mixins(PageView) {
  loading = false;

  get title() {
    return this.$t("address");
  }

  get assetId() {
    return this.$route.query.assetId as string;
  }

  get meta() {
    const getAssetById = this.$store.getters[GlobalGetters.GET_ASSET_BY_ID];
    const asset: Asset | undefined = getAssetById(this.assetId);
    const symbol = asset?.symbol ?? "";

    return {
      symbol
    };
  }

  handleCreateAddress() {
    this.$router.push({
      name: "address-create",
      query: { assetId: this.assetId }
    });
  }
}
export default AddressSelect;
</script>
