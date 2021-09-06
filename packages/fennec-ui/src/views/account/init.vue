<template>
  <div class="init-page">
    <div class="text-center">
      <v-img
        class="d-inline-block"
        width="88"
        height="88"
        :src="require('../../assets/images/wallet.png')"
      />
    </div>

    <div class="text-1 text-center my-8">
      Please create a Mixin Network Account with one of the following ways
    </div>

    <privacy-policies :accepted.sync="accepted" />

    <f-button block color="primary" class="my-8" @click="handleToCreate">
      <v-icon size="16">$IconAddBold</v-icon>
      <span class="ml-2">Create Account</span>
    </f-button>

    <f-button
      block
      color="white"
      class="greyscale_6--text my-8"
      @click="handleToImport"
    >
      <v-icon size="16">$FIconImport4PBold</v-icon>
      <span class="ml-2">Import Account</span>
    </f-button>
  </div>
</template>

<script lang="ts">
import { Component, Mixins } from "vue-property-decorator";
import PrivacyPolicies from "../../components/setting/PrivacyPolicies.vue";
import PageView from "../../mixin/page";
import { Sync } from "vuex-pathify";
import { EVENTS } from "@foxone/fennec-ui/defaults";

@Component({
  components: {
    PrivacyPolicies
  }
})
class AccountInitPage extends Mixins(PageView) {
  @Sync("page/home@accepted") accepted;

  isCover = true;

  handleToCreate() {
    if (!this.accepted) {
      this.$root.$emit(EVENTS.CHECK_PRIVACY_TERMS);
    } else {
      this.$router.push({ name: "account-create" });
    }
  }

  handleToImport() {
    if (!this.accepted) {
      this.$root.$emit(EVENTS.CHECK_PRIVACY_TERMS);
    } else {
      this.$router.push({ name: "account-import" });
    }
  }

  openWindow = this.$utils.helper.debounce(() => {
    if (this.$utils.helper.isPopup()) {
      this.$messages.openWindow("/");
      window.close();
    }
  }, 200);

  mounted() {
    this.openWindow();
  }
}
export default AccountInitPage;
</script>

<style lang="scss" scoped>
.init-page {
  width: 320px;
}
</style>
