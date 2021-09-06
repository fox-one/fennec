<template>
  <f-app-bar flat custom-content app color="bg" class="pa-0">
    <v-layout>
      <f-button
        v-if="meta.back"
        icon
        small
        class="ml-n2 back-icon"
        @click="handleBack"
      >
        <v-icon>$FIconChevronLeft</v-icon>
      </f-button>

      <v-flex class="text-center nav-title">
        <Render :nodes="meta.title" />
      </v-flex>

      <Render :nodes="tail" />

      <action-maximize />
    </v-layout>
  </f-app-bar>
</template>

<script lang="ts">
import { EVENTS } from "@foxone/fennec-ui/defaults";
import { Component, Vue } from "vue-property-decorator";
import Render from "../../components/common/Render";

@Component({ components: { Render } })
class TopNavNormal extends Vue {
  title = null;

  tail = null;

  get meta() {
    const appbar = this.$store.state.app.appbar;

    return {
      back: appbar.back,
      title: this.title || appbar.title
    };
  }

  mounted() {
    this.$root.$on(EVENTS.SET_NAV_TITLE, (v) => {
      this.title = v;
    });
    this.$root.$on(EVENTS.SET_NAV_TAIL, (v) => {
      this.tail = v;
    });
  }

  handleBack() {
    this.$router.back();
  }
}
export default TopNavNormal;
</script>

<style lang="scss" scoped>
.nav-title {
  font-weight: 500;
}

.back-icon {
  &::before {
    display: none !important;
  }
}
</style>
