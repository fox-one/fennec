<template>
  <v-main>
    <v-container fill-height class="pa-0 flex-nowrap">
      <side-nav />
      <v-layout column class="page-right">
        <div>
          <top-nav />
          <breadcrumbs />
          <f-divider />
          <banner class="mt-4" />
        </div>

        <v-flex class="page-content">
          <router-view />
        </v-flex>
      </v-layout>
    </v-container>
  </v-main>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import SideNav from "./SideNav.vue";
import TopNav from "./TopNav.vue";
import Breadcrumbs from "./Breadcrumbs.vue";
import Banner from "../../components/home/Banner.vue";

@Component({
  components: {
    Breadcrumbs,
    SideNav,
    TopNav,
    Banner
  }
})
class DesktopLayout extends Vue {}
export default DesktopLayout;
</script>

<style lang="scss" scoped>
.page-right {
  align-items: stretch;
  max-height: 100vh;
  margin-left: 80px;
  padding-top: 44px;
  overflow: hidden;

  .page-content {
    overflow-y: auto;
    overflow-x: hidden;
    padding: 32px 0;
  }
}
</style>
