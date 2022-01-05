<template>
  <div class="information-item f-number" :class="classes">
    <div class="information-title">
      <slot name="title">
        {{ title }}
      </slot>
    </div>
    <div class="information-value">
      <copy-field v-if="copyable" :text="value">
        <slot name="value">
          {{ value }}
        </slot>
      </copy-field>
      <slot v-else name="value">
        {{ value }}
      </slot>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component
class InformationItem extends Vue {
  @Prop() title!: string;

  @Prop() value!: string;

  @Prop() copyable!: boolean;

  get classes() {
    return { "information-item--desktop": this.isDesktop };
  }

  get isDesktop() {
    return !this.$vuetify.breakpoint.smAndDown;
  }
}
export default InformationItem;
</script>

<style lang="scss" scoped>
.information-item {
  display: flex;
  flex-direction: column;
  font-size: 12px;
  padding: 16px 0;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }

  &--desktop {
    flex-direction: row;
    align-items: center;

    .information-title {
      flex: 1;
      margin-right: 16px;
    }
  }

  &:not(.information-item--desktop) {
    .information-value {
      margin-top: 4px;
    }
  }

  .information-title {
    color: var(--v-label-base);
    white-space: nowrap;
  }

  .information-value {
    word-break: break-all;
  }
}
</style>
