<template>
  <v-app id="app" class="app">
    <f-loading v-if="initing" loading color="primary" fullscreen />
    <template v-else>
      <component :is="layoutComponent">
        <router-view />
      </component>
    </template>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import DefaultLayout from "./layouts/default/Index.vue";
import AuthRequest from "./components/auth/AuthRequest.vue";

@Component({
  components: {
    DefaultLayout,
    AuthRequest
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

  get initing() {
    return this.$store.state.app.initing;
  }

  get hasAuthRequest() {
    return this.$store.state.auth.authorizeRequests.length > 0;
  }

  async mounted() {
    await this.$utils.app.init(this);
  }
}
export default App;
</script>

<style lang="scss" scoped>
.app {
  width: 400px;
  height: 600px;
  overflow: auto;
}
</style>
