<template>
  <f-list-item :title="meta.title" :subtitle="meta.subtitle" />
</template>

<script lang="ts">
import { User } from "@foxone/mixin-sdk/types";
import { Component, Vue, Prop } from "vue-property-decorator";

@Component
class AccountItem extends Vue {
  @Prop() id!: string;

  user: User | null = null;

  get meta() {
    return {
      title: this.user?.full_name ?? "-",
      subtitle: this.user?.user_id ?? ""
    };
  }

  mounted() {
    this.requestAccount();
  }

  async requestAccount() {
    this.user = await this.$endpoints.getUser(this.id);
  }
}
export default AccountItem;
</script>
