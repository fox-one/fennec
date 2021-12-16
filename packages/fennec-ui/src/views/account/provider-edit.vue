<template>
  <div>
    <warning :text="$t('provider.add.warning')" />

    <account-provider-form :value="value" class="mt-8" />
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
class AccountProviderEdit extends Mixins(PageView) {
  get title() {
    return this.$t("provider.edit");
  }

  get appbar() {
    return {};
  }

  get value() {
    const value = this.$route.query.value as string;

    return decodeURIComponent(value);
  }
}
export default AccountProviderEdit;
</script>
