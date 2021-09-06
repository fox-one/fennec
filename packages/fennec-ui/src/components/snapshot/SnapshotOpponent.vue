<template>
  <information-item :title="title">
    <template #value>
      <user-avatar :id="value" />
    </template>
  </information-item>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
class SnapshotOpponent extends Vue {
  @Prop() value!: string;

  @Prop() title!: string;
}
export default SnapshotOpponent;
</script>
