<template>
  <div>
    <top-nav-home v-show="meta.isHome" />
    <top-nav-normal v-show="!meta.isHome" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import TopNavNormal from "./TopNavNormal.vue";
import TopNavHome from "./TopNavHome.vue";

@Component({
  components: {
    TopNavNormal,
    TopNavHome
  }
})
class TopNav extends Vue {
  get meta() {
    const isHome = this.$route.name === "home";

    return {
      isHome
    };
  }
}
export default TopNav;
</script>

<style lang="scss" scoped>
::v-deep {
  .v-toolbar__content {
    padding: 0;
    font-size: 25px;
    font-weight: 600;
  }

  .f-app-bar__nav-icon {
    &::before {
      display: none;
    }
  }

  .v-ripple__container {
    display: none;
  }
}
</style>
