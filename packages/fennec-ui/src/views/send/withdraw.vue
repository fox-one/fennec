<template>
  <div>
    <withdraw-fee :address="address" :asset="form.asset" class="mb-8" />
    <withdraw-form :form="form" :address.sync="address" />
  </div>
</template>

<script lang="ts">
import { Component, Mixins } from "vue-property-decorator";
import { Address } from "@foxone/mixin-api/types";
import WithdrawForm from "../../components/send/WithdrawForm.vue";
import WithdrawFee from "../../components/send/WithdrawFee.vue";
import PageView from "../../mixin/page";
import { Sync } from "vuex-pathify";

@Component({
  components: {
    WithdrawForm,
    WithdrawFee
  },
  beforeRouteLeave(to, from, next) {
    if (to.name !== "address-select") {
      const vm = this as any;

      vm.form.amount = "";
      vm.form.address_id = "";
      vm.address = null;
    }

    next();
  }
})
class WithdrawPage extends Mixins(PageView) {
  @Sync("page/send@withdrawForm") form;

  address: Address | null = null;

  get title() {
    return "Send";
  }

  get preset() {
    return this.$route.query.preset;
  }

  mounted() {
    this.setInitAsset();
  }

  setInitAsset() {
    const asset = this.$utils.asset.setInitAsset(
      this,
      this.preset,
      this.form.asset
    );

    if (asset && this.form.asset?.asset_id !== asset.asset_id) {
      this.form.asset = asset;
    }
  }
}
export default WithdrawPage;
</script>
