<template>
  <f-panel>
    <div class="f-caption">Approach 2</div>
    <div class="text-center">
      <div class="f-body-1 font-weight-bold mt-3">
        Import a bot account from Mixin Developer Dashboard
      </div>
      <div class="my-5">
        <action-import-keystore v-bind="$attrs" v-on="$listeners" />
      </div>
      <div>
        <a :href="href" target="_blank" class="f-caption">Instructions</a>
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
