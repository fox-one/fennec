<template>
  <v-breadcrumbs :items="items" divider="/"> </v-breadcrumbs>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import type { Location } from "vue-router";

@Component
class Breadcrumbs extends Vue {
  get items() {
    const breadcrumbs: Location[] = this.$store.state.app.breadcrumbs;

    return breadcrumbs.map((x) => {
      return {
        ...x,
        text: x.name ?? ""
      };
    });
  }
}
export default Breadcrumbs;
</script>
