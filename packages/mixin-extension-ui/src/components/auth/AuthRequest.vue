<template>
  <v-alert
    dense
    outlined
    border="left"
    type="info"
    :icon="$icons.mdiInformation"
  >
    <div class="f-body-2">
      An application, self-identifying as
      <span class="font-weight-bold">{{ meta.origin }}</span> is requesting
      access from
      <a :href="meta.url" class="text--underlined">{{ meta.url }}</a>
    </div>
    <v-layout class="mt-1">
      <v-spacer />
      <v-btn
        small
        text
        color="primary"
        :loading="approving"
        :disabled="processing"
        @click="handleApproveRequest"
      >
        Allow
      </v-btn>
      <v-btn
        small
        text
        color="error"
        :loadiing="rejecting"
        :disabled="processing"
        @click="handleRejectRequest"
      >
        Reject
      </v-btn>
    </v-layout>
  </v-alert>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import type { AuthorizeRequest } from "@foxone/mixin-extension-base/state/auth";

@Component
class AuthRequest extends Vue {
  @Prop() request!: AuthorizeRequest;

  approving = false;

  rejecting = false;

  get processing() {
    return this.approving || this.rejecting;
  }

  get meta() {
    const origin = this.request.payload.origin;
    const url = this.request.url;
    return {
      url,
      origin
    };
  }

  async handleApproveRequest() {
    this.approving = true;
    try {
      await this.$messages.approveAuthRequest(this.request.id);
      this.$utils.helper.toast(this, { message: "Approved", color: "success" });
      this.$router.push({ name: "home" });
    } catch (error) {
      this.$utils.helper.errorToast(this, error);
    }
    this.approving = false;
  }

  async handleRejectRequest() {
    this.rejecting = true;
    try {
      await this.$messages.rejectAuthRequest(this.request.id);
      this.$utils.helper.toast(this, { message: "Rejected", color: "success" });
      this.$router.push({ name: "home" });
    } catch (error) {
      this.$utils.helper.errorToast(this, error);
    }
  }
}
export default AuthRequest;
</script>
