<template>
  <f-input :value="value" v-bind="$attrs" v-on="$listeners">
    <template #prepend-inner>
      <v-icon color="label">$FIconSearch</v-icon>
    </template>
  </f-input>
</template>

<script lang="ts">
import { Component, Model, Vue } from "vue-property-decorator";

@Component
class SearchInput extends Vue {
  @Model("input") value!: string;
}
export default SearchInput;
</script>

<style lang="scss" scoped>
.v-input--is-dirty,
.v-input--is-focused {
  ::v-deep {
    .v-input__prepend-inner {
      opacity: 0;
      width: 0;
      padding-right: 0 !important;
    }
  }
}

::v-deep {
  .v-input__prepend-inner {
    transition: 0.1s ease;
  }
}
</style>
