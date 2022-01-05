<template>
  <v-layout
    align-center
    class="account rounded pa-4"
    :class="classes"
    @click="handleSelectAccount"
  >
    <div class="mr-4 d-flex">
      <account-avatar :size="24" :url="meta.avatar" />
    </div>
    <v-flex>
      <v-layout align-center>
        <v-flex class="font-weight-bold">{{ meta.name }}</v-flex>

        <v-btn
          v-show="canEdit && meta.isActive"
          icon
          small
          @click.stop="handleToEdit"
        >
          <v-icon>$FIconEdit</v-icon>
        </v-btn>
      </v-layout>
    </v-flex>
  </v-layout>
</template>

<script lang="ts">
import { User } from "@foxone/mixin-api/types";
import { Component, Vue, Prop } from "vue-property-decorator";
import AccountAvatar from "../../components/account/AccountAvatar.vue";

@Component({
  components: {
    AccountAvatar
  }
})
class AccountOverviewItem extends Vue {
  @Prop() profile!: User;

  @Prop({ type: Boolean, default: false }) canEdit!: boolean;

  get classes() {
    return { "account--active": this.meta.isActive };
  }

  get meta() {
    const preference = this.$store.state.preference.preference;
    const selectedAccount = preference.selectedAccount;
    const isActive = selectedAccount === this.profile?.user_id;

    return {
      isActive,
      avatar: this.profile?.avatar_url ?? "",
      name: this.profile?.full_name ?? ""
    };
  }

  async handleSelectAccount() {
    await this.$utils.account.selectAccount(this, this.profile.user_id);

    this.$router.push({ name: "home" });
  }

  handleToEdit() {
    this.$router.push({ name: "account-edit" });
  }
}
export default AccountOverviewItem;
</script>

<style lang="scss" scoped>
.account {
  background: var(--v-bg_card-base);
  margin-bottom: 12px;
}

.account--active {
  border: 2px solid var(--v-primary-base);
}
</style>
