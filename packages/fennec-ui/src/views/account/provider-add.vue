<template>
  <div>
    <warning :text="$t('provider.add.warning')" />

    <account-provider-form class="mt-8" />
  </div>
</template>

<script lang="ts">
import { Component, Mixins } from "vue-property-decorator";
import PageView from "../../mixin/page";
import AccountProviderForm from "../../components/account/AccountProviderForm.vue";

@Component({
  components: {
    AccountProviderForm
  }
})
class AccountProviderAdd extends Mixins(PageView) {
  get title() {
    return this.$t("provider.add");
  }

  get appbar() {
    return {};
  }
}
export default AccountProviderAdd;
</script>
