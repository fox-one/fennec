<template>
  <side-nav-item-base
    :active="meta.isActive"
    class="account-item"
    @click.native="handleClick"
  >
    <v-avatar size="16" class="mr-2">
      <v-img :src="meta.avatar" />
    </v-avatar>

    <span class="name">{{ meta.name }}</span>

    <v-btn
      v-if="meta.isActive"
      icon
      small
      class="edit"
      @click.stop="handleToEdit"
    >
      <v-icon size="16">$FIconEdit4P</v-icon>
    </v-btn>
  </side-nav-item-base>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import SideNavItemBase from "./SideNavItemBase.vue";
import { wallets } from "../../router/routes";

@Component({
  components: {
    SideNavItemBase
  }
})
class SideNavItemAccount extends Vue {
  @Prop() item;

  get meta() {
    const preference = this.$store.state.preference.preference;
    const selectedAccount = preference.selectedAccount;
    const inWalletPath = wallets.find((x) => x.name === this.$route.name);
    const isActive =
      inWalletPath && selectedAccount === this.item.profile?.user_id;

    return {
      inWalletPath,
      isActive,
      avatar:
        this.item.profile?.avatar_url ||
        require("../../assets/images/default-avatar.png"),
      name: this.item.profile.full_name
    };
  }

  async handleClick() {
    await this.$utils.account.selectAccount(this, this.item.profile.user_id);
    this.$router.push({ name: "home" });
  }

  handleToEdit() {
    this.$router.push({ name: "account-edit" });
  }
}
export default SideNavItemAccount;
</script>

<style lang="scss" scoped>
.account-item {
  &:hover {
    .edit {
      display: block;
    }
  }
}

.name {
  &:hover {
    color: var(--v-primary-base);
    transition: color 0.2s ease;
  }
}

.edit {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  display: none;

  &:hover {
    color: var(--v-primary-base);
    transition: color 0.2s ease;
  }
}
</style>
