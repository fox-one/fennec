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
          :ripple="false"
          class="pa-0"
          @click="handleSelectAddress(address)"
        >
          <v-list-item-action class="mr-3">
            <v-checkbox
              :off-icon="$icons.mdiCheckboxBlankCircleOutline"
              :on-icon="$icons.mdiCheckboxMarkedCircle"
              :input-value="address.address_id === addressId"
            />
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>
              {{ address.label }}
              <address-edit :address="bindAddress" :asset="asset" />
            </v-list-item-title>
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
import ListWapper from "../common/ListWarpper.vue";
import AddressAdd from "../wallet/AddressAdd.vue";
import AddressEdit from "../wallet/AddressEdit.vue";

@Component({
  components: {
    ListWapper,
    AddressAdd,
    AddressEdit
  }
})
class AddressList extends Vue {
  @Prop() asset!: Asset | null;

  @PropSync("address") bindAddress!: Address | null;

  loading = false;

  addresses: Address[] = [];

  get addressId() {
    return this.bindAddress?.address_id ?? "";
  }

  @Watch("asset", { immediate: true })
  handleAssetChange() {
    if (this.asset) {
      this.requestAssetAddresses(this.asset);
    }
  }

  handleSelectAddress(address: Address) {
    if (this.bindAddress?.address_id === address.address_id) {
      this.bindAddress = null;
    } else {
      this.bindAddress = address;
    }
  }

  async requestAssetAddresses(asset: Asset) {
    this.loading = true;
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
