<template>
  <v-app-bar flat dense app :color="meta.background">
    <account-menu />
    <v-spacer />
    <div>
      <v-btn v-if="meta.isPopup" small icon @click="handleOpenWindow">
        <v-icon size="20">{{ $icons.mdiFullscreen }}</v-icon>
      </v-btn>
      <v-btn small icon @click="handleToConfig">
        <v-icon small>{{ $icons.mdiCog }}</v-icon>
      </v-btn>
      <v-btn v-if="meta.dev" small icon @click="handleReload">
        <v-icon small>{{ $icons.mdiReload }}</v-icon>
      </v-btn>
    </div>
  </v-app-bar>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import AccountMenu from "../account/AccountMenu.vue";

@Component({
  components: {
    AccountMenu
  }
})
class HomeAppbar extends Vue {
  get meta() {
    return {
      isPopup: this.$utils.helper.isPopup(),
      dev: process.env.NODE_ENV === "development",
      background: this.$vuetify.theme.dark ? "#000000" : "#ffffff"
    };
  }

  handleReload() {
    window.location.reload();
  }

  async handleOpenWindow() {
    try {
      await this.$messages.openWindow("/");
    } catch (error) {
      this.$utils.helper.errorToast(this, error);
    }
  }

  handleToConfig() {
    this.$router.push({ name: "settings" });
  }
}
export default HomeAppbar;
</script>
