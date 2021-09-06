<template>
  <div>
    <account-import-by-keystore />

    <div class="text-center my-4">
      <a :href="href" target="_blank" class="label-1"> Instructions </a>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Mixins } from "vue-property-decorator";
import PageView from "../../mixin/page";
import AccountImportByKeystore from "../../components/account/AccountImportByKeystore.vue";
import { DOCS_URL } from "@foxone/fennec-ui/defaults";

@Component({
  components: {
    AccountImportByKeystore
  }
})
class AccountImportPage extends Mixins(PageView) {
  href = DOCS_URL.INSTRUCTIONS;

  get title() {
    return "Import Account";
  }

  get appbar() {
    const smAndDown = this.$vuetify.breakpoint.smAndDown;

    return {
      back: smAndDown
    };
  }
}
export default AccountImportPage;
</script>
