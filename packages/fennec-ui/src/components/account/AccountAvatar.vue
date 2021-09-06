<template>
  <v-img
    :src="url || require('../../assets/images/default-avatar.png')"
    :width="size"
    :height="size"
    class="icon"
  />
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component
class AccountAvatar extends Vue {
  @Prop() url!: string;

  @Prop({ default: "18" }) size!: string;
}
export default AccountAvatar;
</script>

<style lang="scss" scoped>
.icon {
  display: inline-block;
  border-radius: 100px;
  overflow: hidden;
}
</style>
