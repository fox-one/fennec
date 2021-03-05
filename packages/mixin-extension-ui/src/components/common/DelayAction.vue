<template>
  <v-btn v-bind="meta.attrs" v-on="$listeners">
    {{ meta.label }}
  </v-btn>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component
class DelayAction extends Vue {
  @Prop() delay!: number;

  @Prop() label!: number;

  counter = 0;

  get meta() {
    const disabled = this.$attrs.disabled || this.counter > 0;
    return {
      disabled,
      label: disabled ? `${this.label} (${this.counter}S)` : this.label,
      attrs: { ...this.$attrs, disabled }
    };
  }

  mounted() {
    this.counter = this.delay;

    const update = () => {
      setTimeout(() => {
        if (this.counter-- > 0) {
          update();
        }
      }, 1000);
    };
    update();
  }
}
export default DelayAction;
</script>
