<template>
  <v-alert color="rgba(250, 122, 79, 0.18)" class="text-3 primary--text">
    <template #prepend>
      <span class="icon">
        <v-img
          width="28"
          height="28"
          contain
          :src="require('../../assets/images/icon-warning.png')"
        />
      </span>
    </template>
    <div class="ml-4">
      <slot>
        {{ text }}
      </slot>
    </div>
  </v-alert>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component
class Warning extends Vue {
  @Prop() text!: string;
}
export default Warning;
</script>

<style lang="scss" scoped>
.icon {
  align-self: self-start;
}

::v-deep {
  .v-alert__wrapper {
    align-items: center;
  }
}
</style>
