<template>
  <v-navigation-drawer
    :value="true"
    stateless
    permanent
    floating
    width="240"
    color="transparent"
    class="py-11 side-nav"
  >
    <side-nav-items />
  </v-navigation-drawer>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import SideNavItems from "./SideNavItems.vue";

@Component({
  components: {
    SideNavItems
  }
})
class SideNav extends Vue {}
export default SideNav;
</script>

<style lang="scss" scoped>
.side-nav {
  min-width: 240px;
}
</style>
