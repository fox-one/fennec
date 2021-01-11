<template>
  <v-app>
    <!-- <default-app-bar /> -->
    <v-main>
      <slot />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
class DefaultLayout extends Vue {}
export default DefaultLayout;
</script>
