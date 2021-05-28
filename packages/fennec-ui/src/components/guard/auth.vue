<template>
  <v-container>
    <auth-request :request="current" />
  </v-container>
</template>

<script lang="ts">
import type { AuthorizeRequest } from "@foxone/fennec-base/state/auth";
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

  get current() {
    return this.requests?.[0];
  }
}
export default Authorize;
</script>
