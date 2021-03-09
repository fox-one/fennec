<template>
  <v-app id="app" class="app">
    <f-loading v-if="meta.initing" loading color="primary" fullscreen />
    <template v-else>
      <modals />
      <init-guard v-if="!meta.inited" />
      <unlock-guard v-else-if="meta.locked" />
      <auth-guard v-else-if="meta.hasAuthRequest" />
      <transfer-guard v-else-if="meta.hasTransferRequest" />
      <component v-else :is="layoutComponent">
        <wallet-guard />
      </component>
    </template>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import DefaultLayout from "./layouts/default/Index.vue";
import AuthGuard from "./components/guard/auth.vue";
import InitGuard from "./components/guard/init.vue";
import TransferGuard from "./components/guard/transfer.vue";
import UnlockGuard from "./components/guard/unlock.vue";
import WalletGuard from "./components/guard/wallet.vue";
import Modals from "./components/modals/Modals.vue";

@Component({
  components: {
    DefaultLayout,
    AuthGuard,
    InitGuard,
    TransferGuard,
    UnlockGuard,
    WalletGuard,
    Modals
  }
})
class App extends Vue {
  get layout(): MixinApp.AppLayout {
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
    const hasTransferRequest =
      this.$store.state.transfer.transferRequests.length > 0;

    return {
      initing,
      inited,
      locked,
      hasAuthRequest,
      hasTransferRequest
    };
  }

  async mounted() {
    await this.$utils.app.init(this);
  }
}
export default App;
</script>

<style lang="scss" scoped>
.app {
  width: 360px;
  height: 600px;
  overflow: auto;
}
</style>
