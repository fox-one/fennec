<template>
  <v-list-item>
    <div class="mr-2 d-flex">
      <account-avatar :url="meta.avatar" size="32" />
    </div>
    <v-list-item-content>
      <v-list-item-title
        class="py-1"
        :class="[{ 'primary--text': meta.active }]"
      >
        {{ meta.title }}
        <!-- <v-chip v-if="meta.active" small color="primary" class="py-1">
          Current
        </v-chip> -->
      </v-list-item-title>
      <v-list-item-subtitle
        class="f-caption"
        :class="[{ 'primary--text': meta.active }]"
      >
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

  async requestAccount() {
    this.user = await this.$utils.account.getUser(this, this.id);
  }
}
export default AccountItem;
</script>
