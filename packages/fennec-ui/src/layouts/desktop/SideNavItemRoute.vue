<template>
  <side-nav-item-base :active="meta.isActive" @click.native="handleClick">
    <v-icon size="16" class="mr-2">{{ item.icon }}</v-icon>
    <span>{{ item.text }}</span>
  </side-nav-item-base>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import SideNavItemBase from "./SideNavItemBase.vue";

@Component({
  components: {
    SideNavItemBase
  }
})
class SideNavItemRoute extends Vue {
  @Prop() item;

  get meta() {
    const isActive = this.$route.name === this.item.path;

    return { isActive };
  }

  handleClick() {
    this.$router.push({ name: this.item.path });
  }
}
export default SideNavItemRoute;
</script>
