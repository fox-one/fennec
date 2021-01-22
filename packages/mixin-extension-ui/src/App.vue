<template>
  <v-app id="app" class="app">
    <template v-if="loading">
      <f-loading color="primary" />
    </template>
    <template v-else-if="hasAuthRequest">
      <auth-request />
    </template>
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
    }
    return "default-layout";
  }

  get initing() {
    return this.$store.state.app.initing;
  }

  get hasAuthRequest() {
    return this.$store.state.auth.authorizeRequests.length > 0;
  }

  mounted() {
    this.$utils.app.init(this);
  }
}
export default App;
</script>

<style lang="scss" scoped>
.app {
  width: 400px;
  height: 800px;
  // color: var(--v-primary-base);
}

.btn {
  color: var(--v-primary-base);
}
</style>
