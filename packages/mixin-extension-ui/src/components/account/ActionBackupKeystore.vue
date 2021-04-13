<template>
  <div>
    <slot name="activator" :on="{ click: handleBackUp }" :loading="loading">
      <v-btn
        rounded
        block
        depressed
        color="primary"
        :loading="loading"
        @click="handleBackUp"
      >
        Backup
      </v-btn>
    </slot>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

import { EVENTS } from "../../defaults";

@Component
class ActionBackUp extends Vue {
  @Prop() id!: string;

  loading = false;

  handleBackUp() {
    this.$utils.account.confirmPassword(this, {
      onSuccess: (password: string) =>
        this.requestExportAccount(password, this.id)
    });
  }

  async requestExportAccount(password: string, account: string) {
    this.loading = true;
    try {
      const exportedJson = await this.$messages.exportAccount(
        account,
        password
      );

      const element = document.createElement("a");
      element.href = `data:text/plain;charset=utf-8,${exportedJson}`;
      element.download = `keystore-${account}.json`;
      element.click();
    } catch (error) {
      this.$utils.helper.errorToast(this, error);
    }
    this.loading = false;
  }
}

export default ActionBackUp;
</script>
