<template>
  <v-layout class="send-method rounded bg">
    <v-avatar :size="24">
      <v-img :src="icon" />
    </v-avatar>
    <v-flex class="ml-4">
      <div class="name">{{ name }}</div>
      <div class="desc">{{ desc }}</div>
    </v-flex>
  </v-layout>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
class SendMethodItem extends Vue {
  @Prop() name!: string;

  @Prop() desc!: string;

  @Prop() icon!: string;
}
export default SendMethodItem;
</script>

<style lang="scss" scoped>
.send-method {
  min-width: 255px;
  padding: 10px 16px;
  align-items: center;
  cursor: pointer;
  margin-bottom: 16px;

  &:last-child {
    margin-bottom: 0;
  }

  .name {
    font-size: 13px;
    font-weight: 500;
  }

  .desc {
    font-size: 12px;
    font-weight: 400;
    color: var(--v-label-base);
  }
}
</style>
