<template>
  <input-field label="Accounts">
    <action-back-up-all-keystore>
      <template #activator="{ on, loading }">
        <action-field
          :loading="loading"
          icon="$FIconFile"
          class="mb-3"
          @click.native="on.click"
        >
          <span>{{ $t("backup") }}</span>
        </action-field>
      </template>
    </action-back-up-all-keystore>
  </input-field>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import ActionBackUpAllKeystore from "../account/ActionBackupAllKeystore.vue";

@Component({
  components: {
    ActionBackUpAllKeystore
  }
})
class BackAccounts extends Vue {}
export default BackAccounts;
</script>
