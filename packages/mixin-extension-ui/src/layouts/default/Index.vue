<template>
  <v-app>
    <default-appbar />
    <v-main>
      <slot />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Appbar from "./Appbar.vue";

@Component({
  components: {
    "default-appbar": Appbar
  }
})
class DefaultLayout extends Vue {}
export default DefaultLayout;
</script>
