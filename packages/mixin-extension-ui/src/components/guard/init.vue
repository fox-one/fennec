<template>
  <v-container class="mb-5">
    <account-import-logo />
    <account-import-keystore class="mt-5" />
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import AccountImportLogo from "../account/AccountImportLogo.vue";
import AccountImportKeystore from "../account/AccountImportKeystore.vue";

@Component({
  components: {
    AccountImportKeystore,
    AccountImportLogo
  }
})
class Init extends Vue {}
export default Init;
</script>
