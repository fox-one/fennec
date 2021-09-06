<template>
  <div>
    <account-provider-list />
  </div>
</template>

<script lang="ts">
import { Component, Mixins } from "vue-property-decorator";
import PageView from "../../mixin/page";
import AccountProviderList from "../../components/account/AccountProviderList.vue";

@Component({
  components: {
    AccountProviderList
  }
})
class AccountProviderPage extends Mixins(PageView) {
  get title() {
    return "Custom Providers";
  }

  get appbar() {
    return {};
  }
}
export default AccountProviderPage;
</script>
