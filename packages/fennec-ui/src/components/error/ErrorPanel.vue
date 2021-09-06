<template>
  <f-panel class="text-center">
    <div class="mb-2">
      <v-icon size="64" color="error">$FIconWarningFill</v-icon>
    </div>
    <div class="my-5 title red--text">{{ error.message }}</div>

    <div>
      <f-tip :closeable="false" class="rounded error-stack" type="text">
        <div class="error-stack">{{ error.stack }}</div>
      </f-tip>
    </div>

    <f-button
      min-width="240"
      class="my-5"
      color="primary"
      @click="handleReload"
    >
      Reload
    </f-button>

    <action-backup-all-keystore>
      <template #activator="{ on }">
        <f-button min-width="240" color="primary" class="mb-5" v-on="on">
          Backup All Keystore
        </f-button>
      </template>
    </action-backup-all-keystore>

    <action-reset-application />
  </f-panel>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import ActionBackupAllKeystore from "../account/ActionBackupAllKeystore.vue";
import ActionResetApplication from "../account/ActionResetApplication.vue";

@Component({
  components: {
    ActionBackupAllKeystore,
    ActionResetApplication
  }
})
class ErrorPanel extends Vue {
  @Prop() error;

  handleReload() {
    window.location.reload();
  }
}
export default ErrorPanel;
</script>

<style lang="scss" scoped>
.error-stack {
  white-space: pre-wrap;
  word-break: break-all;
  text-align: left;
  display: inline-block;
}
</style>
