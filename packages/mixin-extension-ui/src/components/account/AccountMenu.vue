<template>
  <div v-if="meta.currentUser">
    <f-loading fullscreen :loading="loading" />
    <f-bottom-sheet v-model="dialog">
      <template #activator="{ on }">
        <div class="account" v-on="on">
          <v-img
            :src="meta.currentUserAvatar"
            width="18"
            height="18"
            class="mr-2"
          />
          <span class="account-name mr-1">{{ meta.currentUserName }}</span>
          <v-icon size="14">
            {{ $icons.mdiChevronDown }}
          </v-icon>
        </div>
      </template>
      <template #title>
        <span>选择账号</span>
      </template>
      <f-list>
        <account-item
          v-for="(account, index) in meta.accounts"
          :key="index"
          :id="account"
        />
      </f-list>
    </f-bottom-sheet>
  </div>
</template>

<script lang="ts">
import { KeyringMemState } from "@foxone/mixin-extension-base/state/keyring";
import { PerferenceStore } from "@foxone/mixin-extension-base/state/types";
import { User } from "@foxone/mixin-sdk/types";
import { Component, Vue } from "vue-property-decorator";
import AccountItem from "../account/AccountItem.vue";

@Component({
  components: {
    AccountItem
  }
})
class AccountMenu extends Vue {
  currentUser: User | null = null;

  loading = false;

  dialog = false;

  get meta() {
    const keyring: KeyringMemState = this.$store.state.keyring.keyring;
    const preference: PerferenceStore = this.$store.state.preference.preference;
    const selectedAccount = preference.seletedAccount ?? "";
    const accounts = keyring.accounts;
    const currentUserName = this.currentUser?.full_name;
    const currentUserAvatar = this.currentUser?.avatar_url;
    return {
      accounts,
      selectedAccount,
      currentUserName,
      currentUserAvatar
    };
  }

  mounted() {
    this.requestCuurentAccount(this.meta.selectedAccount);
  }

  async handleSelectAccount(user: User) {
    this.dialog = false;
    if (user.user_id === this.currentUser?.user_id) {
      return;
    }
    this.loading = true;
    await this.$messages.selectAccount(user.user_id);
    this.loading = false;
  }

  async requestCuurentAccount(id: string) {
    this.loading = true;
    this.currentUser = await this.$endpoints.getUser(id);
    this.loading = false;
  }
}
export default AccountMenu;
</script>

<style lang="scss" scoped>
.account {
  display: flex;
  align-items: center;

  .account-name {
    font-size: 16px;
    font-weight: bold;
  }
}
</style>
