<template>
  <v-container>
    <f-tip type="warning" class="mb-5">
      {{ $t("auth.tip") }}
    </f-tip>
    <auth-request
      v-for="(request, index) in requests"
      :key="index"
      :request="request"
    />
  </v-container>
</template>

<script lang="ts">
import type { AuthorizeRequest } from "@foxone/fennec-base/state/auth";
import { Component, Mixins } from "vue-property-decorator";
import PageView from "../mixin/page";
import AuthRequest from "../components/auth/AuthRequest.vue";

@Component({
  components: {
    AuthRequest
  }
})
class AuthorizePage extends Mixins(PageView) {
  get title() {
    return this.$t("auth.requests");
  }

  get appbar() {
    return {
      show: true,
      back: false
    };
  }

  get requests(): AuthorizeRequest[] {
    return this.$store.state.auth.authorizeRequests;
  }
}
export default AuthorizePage;
</script>
