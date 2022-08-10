<template>
  <div>
    <transfer-form :form.sync="form" />
  </div>
</template>

<script lang="ts">
import { Component, Mixins } from "vue-property-decorator";
import { Sync } from "vuex-pathify";
import PageView from "../../mixin/page";
import TransferForm from "../../components/send/TransferForm.vue";

@Component({
  components: {
    TransferForm
  },
  beforeRouteLeave(to, from, next) {
    if (to.name !== "send-contacts") {
      const vm = this as any;

      vm.form.amount = "";
      vm.form.opponent = "";
      vm.form.memo = "";
    }

    next();
  }
})
class TransferPage extends Mixins(PageView) {
  @Sync("page/send@transferForm") form;

  get title() {
    return this.$t("send");
  }

  get preset() {
    return this.$route.query.preset;
  }

  get opponent() {
    return this.$route.query.opponent;
  }

  get amount() {
    return this.$route.query.amount;
  }

  mounted() {
    this.setInitAsset();

    if (this.opponent && !this.form.opponent) {
      this.form.opponent = this.opponent;
    }

    if (this.amount) {
      this.form.amount = this.amount;
    }
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
export default TransferPage;
</script>

<style lang="scss" scoped></style>
