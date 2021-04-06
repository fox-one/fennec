<template>
  <div v-if="currentUser">
    <f-loading fullscreen :loading="loading" />
    <f-bottom-sheet v-model="dialog">
      <template #activator="{ on }">
        <div class="account" v-on="on">
          <account-avatar :url="meta.currentUserAvatar" class="mr-2" />
          <span class="account-name mr-1">{{ meta.currentUserName }}</span>
          <v-icon size="14">
            {{ $icons.mdiChevronDown }}
          </v-icon>
        </div>
      </template>
      <template #title>
        <span>Select Account</span>
      </template>
      <f-list>
        <account-item
          v-for="(account, index) in meta.accounts"
          :key="index"
          :id="account"
          @click.native="handleSelectAccount(account)"
        />
      </f-list>
    </f-bottom-sheet>
  </div>
</template>

<script lang="ts">
import { KeyringMemState } from "@foxone/mixin-extension-base/state/keyring";
import { PerferenceStore } from "@foxone/mixin-extension-base/state/types";
import { User } from "@foxone/mixin-sdk/types";
import { Component, Vue, Watch } from "vue-property-decorator";
import AccountItem from "../account/AccountItem.vue";
import AccountAvatar from "../account/AccountAvatar.vue";

@Component({
  components: {
    AccountItem,
    AccountAvatar
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

  @Watch("meta.selectedAccount")
  handleAccountChange() {
    this.requestCuurentAccount(this.meta.selectedAccount);
  }

  mounted() {
    this.requestCuurentAccount(this.meta.selectedAccount);
  }

  async handleSelectAccount(account: string) {
    this.loading = true;
    await this.$utils.account.selectAccount(this, account);
    this.dialog = false;
    this.loading = false;
  }

  async requestCuurentAccount(id: string) {
    this.loading = true;
    this.currentUser = await this.$utils.account.getUser(this, id);
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
