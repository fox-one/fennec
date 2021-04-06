<template>
  <v-container>
    <f-panel class="mb-5">
      <div class="f-caption">Profile</div>
      <account-profile />
    </f-panel>
    <f-panel>
      <div class="f-caption">Accounts <accounts-actions /></div>
      <account-list />
    </f-panel>
    <p class="text-center text--secondary caption mt-2">
      {{ meta.version }}
    </p>
  </v-container>
</template>

<script lang="ts">
import { Component, Mixins } from "vue-property-decorator";
import PageView from "../../mixin/page";
import AccountList from "../../components/account/AccountList.vue";
import AccountProfile from "../../components/account/AccountProfile.vue";
import AccountsActions from "../../components/account/AccountsActions.vue";
import { VERSION } from "../../defaults";

@Component({
  components: {
    AccountList,
    AccountProfile,
    AccountsActions
  }
})
class SettingsPage extends Mixins(PageView) {
  get title() {
    return "Settings";
  }

  get meta() {
    return {
      version: VERSION
    };
  }
}
export default SettingsPage;
</script>
