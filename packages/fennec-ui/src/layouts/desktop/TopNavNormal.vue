<template>
  <f-app-bar flat custom-content height="30" color="transparent" class="pa-0">
    <v-layout align-center>
      <f-button
        v-if="meta.back"
        icon
        small
        class="ml-n2 back-icon"
        @click="handleBack"
      >
        <v-icon>$FIconChevronLeft</v-icon>
      </f-button>

      <v-flex class="nav-title">
        {{ meta.title }}
      </v-flex>

      <Render :nodes="tail" />
    </v-layout>
  </f-app-bar>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Render from "../../components/common/Render";
import { EVENTS } from "@foxone/fennec-ui/defaults";

@Component({
  components: {
    Render
  }
})
class TopNavNormal extends Vue {
  tail = null;

  get meta() {
    const appbar = this.$store.state.app.appbar;

    return {
      back: appbar.back,
      title: appbar.title
    };
  }

  mounted() {
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
  line-height: 1;
}

.back-icon {
  &::before {
    display: none !important;
  }
}
</style>
