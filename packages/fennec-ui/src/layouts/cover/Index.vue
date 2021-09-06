<template>
  <v-main>
    <v-container fill-height align-center justify-center class="pa-4">
      <router-view />
    </v-container>
  </v-main>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
class CoverLayout extends Vue {}
export default CoverLayout;
</script>
