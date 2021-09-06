<template>
  <div>
    <account-edit-form :profile="meta.profile" />
  </div>
</template>

<script lang="ts">
import { GlobalGetters } from "@foxone/fennec-ui/store/types";
import { User } from "@foxone/mixin-api/types";
import { Component, Mixins } from "vue-property-decorator";
import PageView from "../../mixin/page";
import AccountEditForm from "../../components/account/AccountEditForm.vue";

@Component({
  components: {
    AccountEditForm
  }
})
class AccountEditPage extends Mixins(PageView) {
  form = {};

  get title() {
    return "Account Setting";
  }

  get meta() {
    const getters = this.$store.getters;
    const profile: User = getters[GlobalGetters.CURRENT_PROFILE];

    return {
      profile
    };
  }
}
export default AccountEditPage;
</script>
