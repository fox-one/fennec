<template>
  <v-app id="app" class="app">
    <f-loading v-if="meta.loading" loading color="primary" fullscreen />
    <template v-else>
      <component :is="layoutComponent" :error="error" />
      <modals />
    </template>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import CoverLayout from "./layouts/cover/Index.vue";
import PopupLayout from "./layouts/popup/Index.vue";
import DesktopLayout from "./layouts/desktop/Index.vue";
import DesktopOpenLayout from "./layouts/desktop/Open.vue";
import ReactLayout from "./layouts/react/Index.vue";
import ErrorLayout from "./layouts/error/Index.vue";
import Modals from "./components/modals/Modals.vue";
import { EVENTS } from "./defaults";
import { GlobalMutations } from "./store/types";

@Component({
  components: {
    ErrorLayout,
    ReactLayout,
    CoverLayout,
    PopupLayout,
    DesktopLayout,
    DesktopOpenLayout,
    Modals
  }
})
class App extends Vue {
  error: Error | null = null;

  get layout(): State.AppLayout {
    return this.$store.state.app.layout;
  }

  get layoutComponent() {
    const hasReactions = this.$utils.app.hasReactions(this);

    if (this.error) {
      return "error-layout";
    }

    if (hasReactions) {
      return "react-layout";
    }

    switch (this.layout) {
      case "cover":
        return "cover-layout";
      case "popup":
        return "popup-layout";
      case "desktop":
        return "desktop-layout";
      case "desktop-open":
        return "desktop-open-layout";
      default:
        return "desktop-layout";
    }
  }

  get meta() {
    const preference = this.$store.state.preference.preference;
    const selectedAccount = preference.selectedAccount;
    const initing = this.$store.state.app.initing;
    const keyring = this.$store.state.keyring;
    const keyringLoading = keyring.loading;
    const isUnlocked = keyring.keyring.isUnlocked;
    const accounts = keyring.keyring.accounts.length;
    const loading = initing || keyringLoading;

    return {
      isUnlocked,
      accounts,
      selectedAccount,
      loading
    };
  }

  @Watch("meta.isUnlocked")
  @Watch("meta.accounts")
  handleKeyringChange() {
    if (this.meta.isUnlocked && this.meta.accounts > 0) {
      this.$utils.app.loadWalletData(this);
    }
  }

  @Watch("meta.selectedAccount")
  async handleAccountChange(value) {
    if (value) {
      await this.$utils.app.loadWalletData(this);
      this.$store.commit(GlobalMutations.REMOVE_PAGE_DATA);
    } else {
      this.$router.push({ name: "account-import" });
    }
  }

  async mounted() {
    this.$root.$on(EVENTS.APPLICATION_ERROR, (error: Error) => {
      if (error.message.startsWith("[code:01]")) {
        this.$router.push({ name: "account-init" });

        return;
      }

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
