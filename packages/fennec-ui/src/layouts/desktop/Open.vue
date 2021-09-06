<template>
  <v-main>
    <v-container fill-height class="page-container pt-11">
      <v-layout column class="page-content">
        <div>
          <top-nav />
          <breadcrumbs />
          <f-divider />
        </div>

        <v-flex class="">
          <router-view />
        </v-flex>
      </v-layout>
    </v-container>
  </v-main>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import TopNav from "./TopNav.vue";
import Breadcrumbs from "./Breadcrumbs.vue";

@Component({
  components: {
    TopNav,
    Breadcrumbs
  }
})
class DesktopOpenLayout extends Vue {}
export default DesktopOpenLayout;
</script>
<style lang="scss" scoped>
.page-container {
  justify-content: center;

  .page-content {
    max-width: 320px;
  }
}
</style>
