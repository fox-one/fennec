<template>
  <v-app-bar v-if="appbar.show" dense flat app :color="appbar.color">
    <div class="appbar-content">{{ appbar.title }}</div>
    <v-flex class="d-flex">
      <v-btn
        small
        v-if="appbar.back"
        icon
        class="appbar-icon"
        @click="handleBack"
      >
        <v-icon>
          {{ $icons.mdiChevronLeft }}
        </v-icon>
      </v-btn>
      <v-spacer />
      <v-btn v-if="meta.dev" small icon @click="handleReload">
        <v-icon small>{{ $icons.mdiReload }}</v-icon>
      </v-btn>
    </v-flex>
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

  get meta() {
    return {
      dev: process.env.NODE_ENV === "development"
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

<style lang="scss" scoped>
.appbar-content {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  left: 0;
}
</style>
