<template>
  <div>
    <account-overview-list />

    <f-panel :padding="0" class="mt-4">
      <action-field icon="$FIconAdd" @click.native="handleToCreate">
        <span>Create Account</span>
      </action-field>
      <action-field icon="$FIconImport" @click.native="handleToImport">
        <span>Import Account</span>
      </action-field>
    </f-panel>

    <action-field
      icon="$FIconSetting"
      class="mt-4"
      @click.native="handleToSetting"
    >
      <span>Setting</span>
    </action-field>
  </div>
</template>

<script lang="ts">
import { Component, Mixins } from "vue-property-decorator";
import PageView from "../../mixin/page";
import AccountOverviewList from "../../components/account/AccountOverviewList.vue";

@Component({
  components: {
    AccountOverviewList
  }
})
class AccountOverview extends Mixins(PageView) {
  get title() {
    return "My Account";
  }

  handleToCreate() {
    this.$router.push({ name: "account-create" });
  }

  handleToImport() {
    if (this.$utils.helper.isPopup()) {
      this.$messages.openWindow("/account/import");
      window.close();

      return;
    }

    this.$router.push({ name: "account-import" });
  }

  handleToSetting() {
    this.$router.push({ name: "setting" });
  }
}
export default AccountOverview;
</script>
