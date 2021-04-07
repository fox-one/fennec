<template>
  <f-list-item :key="index" :title="authUrl.id">
    <template #tail>
      <f-switch
        :value="authUrl.isAllowed"
        :loading="loading"
        @change="handleAccessChange"
      />
    </template>
  </f-list-item>
</template>

<script lang="ts">
import { AuthUrlInfo } from "@foxone/mixin-extension-base/state/auth";
import { Component, Vue, Prop } from "vue-property-decorator";

@Component
class AuthUrlItem extends Vue {
  @Prop() authUrl!: AuthUrlInfo;

  loading = false;

  async handleAccessChange(value) {
    this.loading = true;
    const isAllowed = Boolean(value);
    const data = { ...this.authUrl, isAllowed };
    const id = this.authUrl.id;
    try {
      await this.$messages.updateAuthUrl(id, data);
    } catch (error) {
      this.$utils.helper.errorToast(this, error);
    }
    this.loading = false;
  }
}
export default AuthUrlItem;
</script>
