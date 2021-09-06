<template>
  <v-checkbox
    v-model="bindValue"
    :ripple="false"
    :color="color"
    hide-details
    off-icon="$FIconCheckBoxOff3P"
    on-icon="$FIconCheckBoxOn3PFill"
    class="ma-0 pa-4 bg_card rounded"
  >
    <template #label>
      <div class="text-4">
        <slot name="label" />
      </div>
    </template>
  </v-checkbox>
</template>

<script lang="ts">
import { Component, Vue, Prop, PropSync } from "vue-property-decorator";

@Component
class CheckBoxField extends Vue {
  @PropSync("value") bindValue!: boolean;

  @Prop({ type: String, default: "primary" }) color!: string;
}
export default CheckBoxField;
</script>

<style lang="scss" scoped>
::v-deep {
  .v-input__slot {
    align-items: flex-start;
  }

  .v-input--selection-controls__input {
    width: 16px;
    height: 20px;
  }

  .v-icon__component {
    width: 12px;
    height: 12px;
  }
}
</style>
