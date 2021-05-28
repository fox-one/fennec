<template>
  <div v-if="!loading" class="profile">
    <div class="text-center">
      <account-avatar :url="meta.avatar" size="32" />
      <div class="f-body-2 font-weight-bold">
        <span>{{ meta.name }}</span>
        <span>
          <account-profile-update-modal
            :user="profile"
            @completed="handleCompleted"
          />
        </span>
      </div>
      <div class="f-caption">Mixin ID: {{ meta.mixinId }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { PreferenceStore } from "@foxone/fennec-base/state/types";
import { User } from "@foxone/mixin-api/types";
import AccountAvatar from "./AccountAvatar.vue";
import AccountProfileUpdateModal from "./AccountProfileUpdateModal.vue";

@Component({
  components: {
    AccountAvatar,
    AccountProfileUpdateModal
  }
})
class AccountProfile extends Vue {
  profile: User | null = null;

  loading = false;

  get meta() {
    const preference: PreferenceStore = this.$store.state.preference.preference;
    const selectedAccount = preference.seletedAccount;

    return {
      selectedAccount,
      avatar: this.profile?.avatar_url,
      name: this.profile?.full_name,
      mixinId: this.profile?.identity_number
    };
  }

  @Watch("meta.selectedAccount", { immediate: true })
  handleAccountChange() {
    this.requestProfile();
  }

  handleCompleted() {
    window.location.reload();
  }

  async requestProfile() {
    const id = this.meta.selectedAccount;

    if (!id) return;

    this.loading = true;

    try {
      this.profile = await this.$utils.account.getUser(this, id, true);
    } catch (error) {
      this.$utils.helper.errorToast(this, error);
    }

    this.loading = false;
  }
}
export default AccountProfile;
</script>
