<template>
  <v-app id="app" class="app">
    <f-loading v-if="meta.initing" loading color="primary" fullscreen />
    <template v-else>
      <modals />
      <init-guard v-if="!meta.inited" />
      <error-guard v-else-if="error" :error="error" />
      <unlock-guard v-else-if="meta.locked" />
      <auth-guard v-else-if="meta.hasAuthRequest" />
      <transfer-guard v-else-if="meta.hasTransferReq" />
      <multisigs-guard v-else-if="meta.hasMultisigsTransactionReq" />
      <component :is="layoutComponent" v-else>
        <wallet-guard />
      </component>
    </template>
  </v-app>
</template>

<script lang="ts">
import type { AppLayout } from "./types";
import { Component, Vue } from "vue-property-decorator";
import DefaultLayout from "./layouts/default/Index.vue";
import AuthGuard from "./components/guard/auth.vue";
import InitGuard from "./components/guard/init.vue";
import TransferGuard from "./components/guard/transfer.vue";
import UnlockGuard from "./components/guard/unlock.vue";
import WalletGuard from "./components/guard/wallet.vue";
import MultisigsGuard from "./components/guard/multisigs.vue";
import ErrorGuard from "./components/guard/error.vue";
import Modals from "./components/modals/Modals.vue";
import { EVENTS } from "./defaults";

@Component({
  components: {
    DefaultLayout,
    AuthGuard,
    InitGuard,
    TransferGuard,
    UnlockGuard,
    WalletGuard,
    MultisigsGuard,
    ErrorGuard,
    Modals
  }
})
class App extends Vue {
  error: Error | null = null;

  get layout(): AppLayout {
    return this.$store.state.app.layout;
  }

  get layoutComponent() {
    switch (this.layout) {
      case "default":
        return "default-layout";
      default:
        return "default-layout";
    }
  }

  get meta() {
    const initing = this.$store.state.app.initing;
    const inited = this.$store.state.keyring.keyring.initialized;
    const locked = !this.$store.state.keyring.keyring.isUnlocked;
    const hasAuthRequest = this.$store.state.auth.authorizeRequests.length > 0;
    const hasTransferReq =
      this.$store.state.transfer.transferRequests.length > 0;
    const hasMultisigsTransactionReq =
      this.$store.state.multisigs.transactionRequests.length > 0;

    return {
      initing,
      inited,
      locked,
      hasAuthRequest,
      hasTransferReq,
      hasMultisigsTransactionReq
    };
  }

  async mounted() {
    this.$root.$on(EVENTS.APPLICATION_ERROR, (error: Error) => {
      this.error = error;
    });
    await this.$utils.app.init(this);
  }
}
export default App;
</script>

<style lang="scss" scoped>
.app {
  height: 100%;
  overflow: auto;
}
</style>
