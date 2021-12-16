<template>
  <account-import-by-provider />
</template>

<script lang="ts">
import { Component, Mixins } from "vue-property-decorator";
import PageView from "../../mixin/page";
import AccountImportByProvider from "../../components/account/AccountImportByProvider.vue";

@Component({
  components: { AccountImportByProvider }
})
class AccountCreatePage extends Mixins(PageView) {
  get title() {
    return this.$t("account.create");
  }

  get appbar() {
    const smAndDown = this.$vuetify.breakpoint.smAndDown;

    return { back: smAndDown };
  }
}
export default AccountCreatePage;
</script>
