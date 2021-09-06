<template>
  <div :class="classes">
    <slot />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component
class SideNavItemBase extends Vue {
  @Prop() active!: boolean;

  get classes() {
    return {
      "nav-item rounded": true,
      "nav-item--active": this.active
    };
  }
}
export default SideNavItemBase;
</script>

<style lang="scss" scoped>
.nav-item {
  position: relative;
  padding: 12px 0;
  font-size: 14px;
  font-weight: 500;
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: padding 0.2s cubic-bezier(0.075, 0.82, 0.165, 1),
    background 0.2s ease;

  &:hover,
  &--active {
    padding: 12px;
  }

  &--active {
    background: var(--v-bg_card-base);
  }

  &:hover {
    background: var(--v-bg_hover-base);
  }
}
</style>
