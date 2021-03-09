<template>
  <v-container>
    <f-tip type="warning" class="mb-5">
      Only approve this request if you trust the application. Approving gives
      the application access to the addresses of your accounts.
    </f-tip>
    <auth-request
      v-for="(request, index) in requests"
      :key="index"
      :request="request"
    />
  </v-container>
</template>

<script lang="ts">
import type { AuthorizeRequest } from "@foxone/mixin-extension-base/state/auth";
import { Component, Vue } from "vue-property-decorator";
import AuthRequest from "../auth/AuthRequest.vue";

@Component({
  components: {
    AuthRequest
  }
})
class Authorize extends Vue {
  get requests(): AuthorizeRequest[] {
    return this.$store.state.auth.authorizeRequests;
  }
}
export default Authorize;
</script>
