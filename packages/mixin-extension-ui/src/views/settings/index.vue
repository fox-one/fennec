<template>
  <div>
    <f-panel class="mb-5 rounded-0">
      <account-profile />
    </f-panel>
    <v-container>
      <f-panel class="mb-5 pa-0">
        <div class="f-caption pa-3">Accounts</div>
        <account-list />
      </f-panel>
      <f-panel class="pa-0">
        <div class="f-caption pa-3">Settings</div>
        <f-list>
          <f-list-item
            title="Manage Website Access"
            @click.native="handleManageWebsiteAccess"
          />
        </f-list>
      </f-panel>
      <p class="text-center text--secondary caption mt-2">
        {{ meta.version }}
      </p>
    </v-container>
  </div>
</template>

<script lang="ts">
import { Component, Mixins } from "vue-property-decorator";
import PageView from "../../mixin/page";
import AccountList from "../../components/account/AccountList.vue";
import AccountProfile from "../../components/account/AccountProfile.vue";
import AuthUrls from "../../components/auth/AuthUrlItem.vue";
import { VERSION } from "../../defaults";

@Component({
  components: {
    AuthUrls,
    AccountList,
    AccountProfile
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

  handleManageWebsiteAccess() {
    this.$router.push({ name: "settings-authUrls" });
  }
}
export default SettingsPage;
</script>
