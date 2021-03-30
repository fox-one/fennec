<template>
  <v-container>
    <f-panel>
      <div class="f-caption">Accounts</div>
      <account-list />
    </f-panel>
  </v-container>
</template>

<script lang="ts">
import { Component, Mixins } from "vue-property-decorator";
import { KeyringMemState } from "@foxone/mixin-extension-base/state/keyring";
import { PerferenceStore } from "@foxone/mixin-extension-base/state/types";
import PageView from "../mixin/page";
import AccountList from "../components/account/AccountList.vue";

@Component({
  components: {
    AccountList
  }
})
class SettingsPage extends Mixins(PageView) {
  get title() {
    return "Settings";
  }

  get meta() {
    const keyring: KeyringMemState = this.$store.state.keyring.keyring;
    const preference: PerferenceStore = this.$store.state.preference.preference;
    return {};
  }
}
export default SettingsPage;
</script>
