<template>
  <div>
    <access-manage />

    <wallet-manage />

    <currency-setting />

    <back-up-accounts />

    <contacts />

    <version />
  </div>
</template>

<script lang="ts">
import { Component, Mixins } from "vue-property-decorator";
import PageView from "../../mixin/page";
import AccessManage from "../../components/setting/AccessManage.vue";
import CurrencySetting from "../../components/setting/CurrencySetting.vue";
import BackUpAccounts from "../../components/setting/BackUpAccounts.vue";
import Version from "../../components/setting/Version.vue";
import Contacts from "../../components/setting/Contacts.vue";
import WalletManage from "../../components/setting/WalletManage.vue";

@Component({
  components: {
    AccessManage,
    CurrencySetting,
    BackUpAccounts,
    Version,
    Contacts,
    WalletManage
  }
})
class SettingsPage extends Mixins(PageView) {
  get title() {
    return this.$t("setting");
  }
}
export default SettingsPage;
</script>
