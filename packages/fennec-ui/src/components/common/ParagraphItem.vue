<template>
  <div>
    <f-divider class="mb-4" />
    <v-layout
      align-center
      class="graph-title"
      :class="{ 'graph-title--expand': expand }"
      @click="handleToggle"
    >
      <v-flex>{{ title }}</v-flex>
      <v-icon size="16" class="icon">$FIconChevronDown4P</v-icon>
    </v-layout>

    <div class="pb-4 pt-0">
      <v-expand-transition>
        <div v-show="expand" class="text">{{ text }}</div>
      </v-expand-transition>
    </div>

    <f-divider class="" />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component
class ParagraphItem extends Vue {
  @Prop() title!: string;

  @Prop() text!: string;

  expand = true;

  handleToggle() {
    this.expand = !this.expand;
  }
}
export default ParagraphItem;
</script>

<style lang="scss" scoped>
.graph-title {
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: transform 0.5s ease;
}

.graph-title--expand {
  .icon {
    transform: rotate(180deg);
  }
}

.text {
  font-size: 12px;
  font-weight: 400;
  color: var(--v-label-base);
}
</style>
