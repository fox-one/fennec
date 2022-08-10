<template>
  <div>
    <div v-if="!empty" class="label-1 mb-4">
      {{ $t("contacts") }}
    </div>

    <user-item
      v-for="({ id, clearable }, index) in contacts"
      :id="id"
      :key="index"
      :clearable="clearable"
      @click.native="handleSelect(id)"
    />

    <div v-if="empty" class="append">
      <span class="label-1 my-5">
        {{ $t("contacts.empty") }}
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import UserItem from "./UserItem.vue";
import { Sync } from "vuex-pathify";

@Component({
  components: {
    UserItem
  }
})
class UserList extends Vue {
  @Sync("page/send@transferForm") form;

  get empty() {
    return this.contacts.length === 0;
  }

  get contacts() {
    const contacts = this.$store.state.page.send.contacts;

    const preference = this.$store.state.preference.preference;
    const selectedAccount = preference.selectedAccount;
    const profiles = this.$store.state.keyring.profiles;
    const others = profiles
      .filter((x) => x.user_id !== selectedAccount)
      .filter((x) => contacts.indexOf(x.user_id) < 0)
      .map((x) => x.user_id);
    const inAccounts = (x) => profiles.findIndex((p) => p.user_id === x) > -1;

    return [...others, ...contacts].map((x) => ({
      id: x,
      clearable: !inAccounts(x)
    }));
  }

  handleSelect(id: string) {
    this.form.opponent = id;
    this.$router.back();
  }
}
export default UserList;
</script>

<style lang="scss" scoped>
.append {
  padding: 24px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
</style>
