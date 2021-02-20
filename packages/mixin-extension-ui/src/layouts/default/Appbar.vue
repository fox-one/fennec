<template>
  <v-app-bar flat dense :color="appbar.color">
    <v-btn small v-if="appbar.back" icon @click="handleBack">
      <v-icon>
        {{ $icons.mdiChevronLeft }}
      </v-icon>
    </v-btn>
    <span>{{ appbar.title }}</span>
    <v-spacer />
    <v-btn small icon @click="handleReload">
      <v-icon small>{{ $icons.mdiReload }}</v-icon>
    </v-btn>
  </v-app-bar>
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
