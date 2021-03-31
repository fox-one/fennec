<template>
  <v-list-item>
    <v-list-item-avatar>
      <account-avatar :url="meta.avatar" size="32" />
    </v-list-item-avatar>
    <v-list-item-content>
      <v-list-item-title>
        {{ meta.title }}
      </v-list-item-title>
      <v-list-item-subtitle class="f-caption">
        {{ meta.subtitle }}
      </v-list-item-subtitle>
    </v-list-item-content>
    <v-list-item-action>
      <slot name="action">
        <v-icon>
          {{ $icons.mdiChevronRight }}
        </v-icon>
      </slot>
    </v-list-item-action>
  </v-list-item>
</template>

<script lang="ts">
import { User } from "@foxone/mixin-sdk/types";
import { Component, Vue, Prop } from "vue-property-decorator";
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

  user: User | null = null;

  get meta() {
    return {
      title: this.user?.full_name ?? "-",
      subtitle: this.id,
      avatar: this.user?.avatar_url
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
