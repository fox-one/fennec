<template>
  <v-container class="mb-5">
    <account-import-logo />
    <account-import-keystore class="mt-5" />
    <account-import-with-provider class="mt-5" />
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import AccountImportLogo from "../account/AccountImportLogo.vue";
import AccountImportKeystore from "../account/AccountImportKeystore.vue";
import AccountImportWithProvider from "../account/AccountImportWithProvider.vue";

@Component({
  components: {
    AccountImportKeystore,
    AccountImportLogo,
    AccountImportWithProvider
  }
})
class Init extends Vue {}
export default Init;
</script>
