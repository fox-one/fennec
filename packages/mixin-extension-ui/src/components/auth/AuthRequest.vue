<template>
  <f-panel class="text-center">
    <div class="mb-2">
      <v-icon size="48" color="error">
        {{ $icons.mdiAlert }}
      </v-icon>
    </div>
    <div class="error--text f-title-1">Authorize</div>
    <div class="f-body-2 text--secondary my-5">
      An application, self-identifying as
      <span class="font-weight-bold text--primary">{{ meta.origin }}</span> is
      requesting access from
      <a :href="meta.url" class="text--underlined">{{ meta.url }}</a>
    </div>
    <f-tip type="warning" class="rounded">
      Only approve this request if you trust the application. Approving gives
      the application access to the addresses of your accounts.
    </f-tip>
    <div class="my-5">
      <v-btn
        rounded
        depressed
        min-width="200"
        color="primary"
        class="mb-3"
        :loading="approving"
        :disabled="processing"
        @click="handleApproveRequest"
      >
        Approve
      </v-btn>
      <v-btn
        rounded
        outlined
        depressed
        min-width="200"
        color="error"
        :loadiing="rejecting"
        :disabled="processing"
        @click="handleRejectRequest"
      >
        Reject
      </v-btn>
    </div>
  </f-panel>
  <!-- 
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
  </v-alert> -->
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
      await this.handleRedirect();
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
      await this.handleRedirect();
    } catch (error) {
      this.$utils.helper.errorToast(this, error);
    }
    this.rejecting = false;
  }

  async handleRedirect() {
    await this.$utils.app.init(this);
    this.$router.push({ name: "home" });
  }
}
export default AuthRequest;
</script>
