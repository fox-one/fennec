<template>
  <div>
    <top-nav-home v-show="meta.isHome" />
    <top-nav-normal v-show="!meta.isHome" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import TopNavHome from "./TopNavHome.vue";
import TopNavNormal from "./TopNavNormal.vue";

@Component({
  components: {
    TopNavHome,
    TopNavNormal
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
