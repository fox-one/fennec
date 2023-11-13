<template>
  <div>
    <top-nav />

    <v-main>
      <v-container class="pa-4">
        <banner class="mb-4" />
        <router-view />
      </v-container>
    </v-main>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import TopNav from "./TopNav.vue";
import Banner from "../../components/home/Banner.vue";

@Component({
  components: {
    TopNav,
    Banner
  }
})
class PopupLayout extends Vue {}
export default PopupLayout;
</script>
