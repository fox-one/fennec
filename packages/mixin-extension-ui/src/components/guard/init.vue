<template>
  <v-container class="mb-5">
    <account-import-logo />
    <account-import-keystore
      :policies-accepted="policiesAccepted"
      check-policies-accepted
      class="mt-5"
      @checkPolicies="handleCheckPolicies"
    />
    <account-import-with-provider
      :policies-accepted="policiesAccepted"
      check-policies-accepted
      class="mt-5"
      @checkPolicies="handleCheckPolicies"
    />
    <privacy-policies :focus="focus" :accepted.sync="policiesAccepted" />
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import AccountImportLogo from "../account/AccountImportLogo.vue";
import AccountImportKeystore from "../account/AccountImportKeystore.vue";
import AccountImportWithProvider from "../account/AccountImportWithProvider.vue";
import PrivacyPolicies from "../particle/PrivacyPolicies.vue";

@Component({
  components: {
    AccountImportKeystore,
    AccountImportLogo,
    AccountImportWithProvider,
    PrivacyPolicies
  }
})
class Init extends Vue {
  policiesAccepted = false;

  focus = false;

  mounted() {
    if (this.$utils.helper.isPopup()) {
      this.$messages.openWindow("/");
      window.close();
    }
  }

  handleCheckPolicies() {
    this.focus = true;
  }
}
export default Init;
</script>
