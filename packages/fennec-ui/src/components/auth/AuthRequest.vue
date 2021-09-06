<template>
  <div class="text-center">
    <div class="title-1 hidden-sm-and-down">Authorize</div>

    <div class="my-5 text-1">
      An application, self-identifying as
      <span class="font-weight-bold text--primary">{{ meta.origin }}</span> is
      requesting access from
    </div>

    <div class="bg_card text-left rounded pa-4">
      <v-layout>
        <v-layout align-center class="font-weight-bold">
          <v-avatar v-if="icon" size="24" class="mr-4">
            <v-img :src="icon" />
          </v-avatar>
          <span>{{ meta.origin }}</span>
        </v-layout>
        <v-icon>$IconLink</v-icon>
      </v-layout>
      <div class="label-1 mt-3">{{ meta.url }}</div>
    </div>

    <div class="error--text mt-8">
      Only approve this request if you trust the application. Approving gives
      the application access to the addresses of your accounts.
    </div>

    <div class="mt-8 actions">
      <f-button
        color="white"
        min-width="120"
        class="black--text mr-3"
        :loadiing="rejecting"
        :disabled="processing"
        @click="handleRejectRequest"
      >
        Reject
      </f-button>
      <f-button
        color="primary"
        min-width="120"
        :loading="approving"
        :disabled="processing"
        @click="handleApproveRequest"
      >
        Approve
      </f-button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import type { AuthorizeRequest } from "@foxone/fennec-base/state/auth";

@Component
class AuthRequest extends Vue {
  @Prop() request!: AuthorizeRequest;

  approving = false;

  rejecting = false;

  icon = "";

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

  async mounted() {
    try {
      const url = new URL(this.meta.url);

      this.icon = await this.$utils.helper.getLinkIcon(url.host);
    } catch (error) {
      console.log(error);
    }
  }

  async handleApproveRequest() {
    this.approving = true;

    try {
      await this.$messages.approveAuthRequest(this.request.id);
      this.$uikit.toast.success({ message: "Approved", color: "success" });
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
      this.$uikit.toast.error({ message: "Rejected", color: "success" });
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

<style lang="scss" scoped>
.error--text {
  font-size: 12px;
}

.title-1 {
  font-weight: 600;
}

.actions {
  display: flex;

  .f-btn {
    flex: 1;
    max-width: 50%;
  }
}
</style>
