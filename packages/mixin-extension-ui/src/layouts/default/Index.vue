<template>
  <div>
    <default-appbar />
    <default-modals />
    <v-main>
      <slot />
    </v-main>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Appbar from "./Appbar.vue";
import Modals from "./Modals.vue";

@Component({
  components: {
    "default-appbar": Appbar,
    "default-modals": Modals
  }
})
class DefaultLayout extends Vue {}
export default DefaultLayout;
</script>
