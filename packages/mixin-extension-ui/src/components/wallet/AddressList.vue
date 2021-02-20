<template>
  <div>
    <list-wapper
      :loading="loading"
      :data="addresses"
      hint="No withdraw address"
    >
      <v-list>
        <v-list-item
          v-for="(address, index) in addresses"
          :key="index"
          class="pa-0"
          @click="handleSelectAddress"
        >
          <v-list-item-action class="mr-3">
            <v-checkbox
              :off-icon="$icons.mdiCheckboxBlankCircleOutline"
              :on-icon="$icons.mdiCheckboxMarkedCircle"
              :input-value="address.id === bindAddress"
            />
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title> {{ address.label }} </v-list-item-title>
            <v-list-item-subtitle>
              <span>{{ address.destination }}</span>
              <span v-if="address.tag">
                {{ address.tag }}
              </span>
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </list-wapper>
    <address-add :asset="asset" />
  </div>
</template>

<script lang="ts">
import { Address, Asset } from "@foxone/mixin-sdk/types";
import { Component, Vue, Prop, Watch, PropSync } from "vue-property-decorator";
import ListWapper from "../hoc/ListWarpper.vue";
import AddressAdd from "../wallet/AddressAdd.vue";

@Component({
  components: {
    ListWapper,
    AddressAdd
  }
})
class AddressList extends Vue {
  @Prop() asset!: Asset | null;

  @PropSync("address") bindAddress!: string;

  loading = false;

  addresses: Address[] = [];

  @Watch("asset", { immediate: true })
  handleAssetChange() {
    if (this.asset) {
      this.requestAssetAddresses(this.asset);
    }
  }

  handleSelectAddress(address: Address) {
    this.bindAddress = address.address_id;
  }

  async requestAssetAddresses(asset: Asset) {
    this.loading = true;
    console.log(asset);
    try {
      const addresses = await this.$endpoints.getAssetWithdrawAddresses(
        asset.asset_id
      );
      this.addresses = addresses;
    } catch (error) {
      this.$utils.helper.errorToast(this, error);
    }
    this.loading = false;
  }
}
export default AddressList;
</script>
