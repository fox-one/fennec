<template>
  <f-app-bar v-bind="appbar" @back="handleBack">
    <v-btn icon small @click="handleReload">
      <v-icon>{{ $icons.mdiReload }}</v-icon>
    </v-btn>
  </f-app-bar>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
class Appbar extends Vue {
  get appbar() {
    const state = this.$store.state;
    const appbar = state.app.appbar;
    const isDark = state.app.settings.dark;

    return {
      ...appbar,
      color: isDark ? "#121212" : "#FFFFFF"
    };
  }

  handleReload() {
    window.location.reload();
  }

  handleBack() {
    if (window.history.length <= 1) {
      this.$router.push({ name: "index" });
    } else {
      this.$router.back();
    }
  }
}
export default Appbar;
</script>
