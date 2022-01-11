<template>
  <v-layout class="rounded action" :class="{ 'action--loading': loading }">
    <template v-if="loading">
      <f-loading color="white" size="18" width="2" class="loading" />
    </template>
    <template v-else>
      <v-icon :size="iconSize">{{ icon }}</v-icon>
      <v-flex class="ml-4">
        <slot />
      </v-flex>
    </template>
  </v-layout>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component
class ActionField extends Vue {
  @Prop() icon!: string;

  @Prop({ type: [Number, String], default: 24 }) iconSize!: number;

  @Prop({ type: Boolean, default: false }) loading!: boolean;
}
export default ActionField;
</script>

<style lang="scss" scoped>
.action {
  min-height: 56px;
  background: var(--v-bg_card-base);
  cursor: pointer;
  align-items: center;
  padding: 0 12px;
  font-weight: 500;

  &:hover {
    background: var(--v-bg_hover-base);
  }
}

.action--loading {
  justify-content: center;
  pointer-events: none;
}

.loading {
  height: 18px;
}
</style>
