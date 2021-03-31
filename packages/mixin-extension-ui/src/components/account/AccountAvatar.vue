<template>
  <v-img
    :src="url || '../../assets/images/default-avatar.vue'"
    :width="size"
    :height="size"
    class="mr-2"
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
