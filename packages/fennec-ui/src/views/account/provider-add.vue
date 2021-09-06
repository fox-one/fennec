<template>
  <div>
    <warning
      text="Make sure your provider is reliable, otherwise you might suffer unpredictable loss."
    />

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
    return "Add Provider";
  }

  get appbar() {
    return {};
  }
}
export default AccountProviderAdd;
</script>
