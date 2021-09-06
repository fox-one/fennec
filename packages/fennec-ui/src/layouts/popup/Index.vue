<template>
  <div>
    <top-nav />

    <v-main>
      <v-container class="pa-4">
        <router-view />
      </v-container>
    </v-main>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import TopNav from "./TopNav.vue";

@Component({
  components: {
    TopNav
  }
})
class PopupLayout extends Vue {}
export default PopupLayout;
</script>
