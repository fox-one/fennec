<template>
  <f-panel>
    <div class="f-caption">Approach 1</div>
    <div class="text-center">
      <div class="f-body-1 font-weight-bold mt-3">
        Create a bot account from Developer Dashboard
      </div>
      <div class="my-5">
        <action-import-keystore />
      </div>
      <div>
        <a class="f-caption">Instructions</a>
      </div>
    </div>
  </f-panel>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import ActionImportKeystore from "./ActionImportKeystore.vue";

@Component({
  components: {
    ActionImportKeystore
  }
})
class AccountImportKeystore extends Vue {}
export default AccountImportKeystore;
</script>
