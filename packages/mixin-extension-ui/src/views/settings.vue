<template>
  <v-container>
    <f-panel>
      <div class="f-caption">Accounts</div>
      <account-list />
    </f-panel>
    <p class="text-center text--secondary caption mt-2">
      {{ meta.version }}
    </p>
  </v-container>
</template>

<script lang="ts">
import { Component, Mixins } from "vue-property-decorator";
import PageView from "../mixin/page";
import AccountList from "../components/account/AccountList.vue";
import { VERSION } from "../defaults";

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
    return {
      version: VERSION
    };
  }
}
export default SettingsPage;
</script>
