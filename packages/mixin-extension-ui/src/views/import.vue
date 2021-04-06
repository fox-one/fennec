<template>
  <v-container class="pa-0">
    <account-import-logo class="rounded-0" />
    <div class="pa-3">
      <account-import-keystore class="pa-5" />
      <account-import-with-provider class="mt-5" />
    </div>
  </v-container>
</template>

<script lang="ts">
import { Component, Mixins } from "vue-property-decorator";
import AccountImportLogo from "../components/account/AccountImportLogo.vue";
import AccountImportKeystore from "../components/account/AccountImportKeystore.vue";
import AccountImportWithProvider from "../components/account/AccountImportWithProvider.vue";
import PageView from "../mixin/page";

@Component({
  components: {
    AccountImportLogo,
    AccountImportKeystore,
    AccountImportWithProvider
  }
})
class ImportPage extends Mixins(PageView) {
  get title() {
    return "Import Account";
  }
}
export default ImportPage;
</script>
