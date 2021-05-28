<template>
  <f-list-item>
    <template #head>
      <account-avatar :url="meta.avatar" size="32" />
    </template>
    <template #body>
      <v-list-item-content>
        <v-list-item-title
          class="py-1"
          :class="[{ 'primary--text': meta.active }]"
        >
          {{ meta.title }}
        </v-list-item-title>
        <v-list-item-subtitle
          class="f-caption"
          :class="[{ 'primary--text': meta.active }]"
        >
          {{ meta.subtitle }}
        </v-list-item-subtitle>
      </v-list-item-content>
    </template>
    <template #tail>
      <slot name="action"></slot>
    </template>
  </f-list-item>
</template>

<script lang="ts">
import { User } from "@foxone/mixin-api/types";
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import ArrowRight from "../icons/ArrowRight.vue";
import AccountAvatar from "../account/AccountAvatar.vue";

@Component({
  components: {
    ArrowRight,
    AccountAvatar
  }
})
class AccountItem extends Vue {
  @Prop() id!: string;

  @Prop() current!: string;

  user: User | null = null;

  get meta() {
    return {
      title: this.user?.full_name ?? "-",
      subtitle: this.id,
      avatar: this.user?.avatar_url,
      active: this.current === this.id
    };
  }

  mounted() {
    this.requestAccount();
  }

  @Watch("id")
  async requestAccount() {
    try {
      this.user = await this.$utils.account.getUser(this, this.id);
    } catch (error) {
      console.log(error);
    }
  }
}
export default AccountItem;
</script>
