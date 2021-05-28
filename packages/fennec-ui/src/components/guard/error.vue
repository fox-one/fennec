<template>
  <v-container>
    <f-panel class="text-center">
      <div class="mb-2">
        <v-icon size="64" color="error">{{ $icons.mdiAlert }}</v-icon>
      </div>
      <div class="my-5 title red--text">{{ error.message }}</div>

      <div>
        <f-tip class="rounded error-stack" type="text">
          <div class="error-stack">{{ error.stack }}</div>
        </f-tip>
      </div>

      <v-btn
        rounded
        depressed
        min-width="200"
        class="my-5"
        color="primary"
        @click="handleReload"
      >
        Reload
      </v-btn>

      <action-backup-all-keystore>
        <template #activator="{ on }">
          <v-btn
            rounded
            depressed
            min-width="200"
            color="primary"
            class="mb-5"
            v-on="on"
          >
            BackUp All Keystore
          </v-btn>
        </template>
      </action-backup-all-keystore>

      <reset-application />
    </f-panel>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import ActionBackupAllKeystore from "../account/ActionBackupAllKeystore.vue";
import ResetApplication from "../particle/ResetApplication.vue";

@Component({
  components: {
    ActionBackupAllKeystore,
    ResetApplication
  }
})
class ErrorGuard extends Vue {
  @Prop() error!: Error | null;

  handleReload() {
    window.location.reload();
  }
}
export default ErrorGuard;
</script>

<style lang="scss" scoped>
.error-image {
  width: 40px;
}

.error-stack {
  white-space: pre-wrap;
  word-break: break-all;
  text-align: left;
  display: inline-block;
}
</style>
