<template>
  <f-panel>
    <div class="text-center">
      <div class="mt-3 text-2">
        {{ $t("import.from.dashborad") }}
      </div>
      <div class="mt-6 mb-3">
        <action-import-keystore v-bind="$attrs" v-on="$listeners" />
      </div>
    </div>
  </f-panel>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { DOCS_URL } from "../../defaults";
import ActionImportKeystore from "./ActionImportKeystore.vue";

@Component({
  components: {
    ActionImportKeystore
  }
})
class AccountImportKeystore extends Vue {
  href = DOCS_URL.INSTRUCTIONS;
}
export default AccountImportKeystore;
</script>
