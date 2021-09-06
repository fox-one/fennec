<template>
  <v-chip color="bg_card" class="account" @click="handleClick">
    <v-avatar left>
      <v-img :src="meta.avatar" />
    </v-avatar>

    {{ meta.name }}
  </v-chip>
</template>

<script lang="ts">
import { GlobalGetters } from "@foxone/fennec-ui/store/types";
import { Component, Vue } from "vue-property-decorator";
import AccountAvatar from "../../components/account/AccountAvatar.vue";

@Component({
  components: {
    AccountAvatar
  }
})
class TopNavAccount extends Vue {
  get meta() {
    const currentProfile = this.$store.getters[GlobalGetters.CURRENT_PROFILE];
    const avatar = currentProfile?.avatar_url ?? "";
    const name = currentProfile?.full_name ?? "";

    return {
      avatar: avatar || require("../../assets/images/default-avatar.png"),
      name
    };
  }

  handleClick() {
    this.$router.push({ name: "account-overview" });
  }
}
export default TopNavAccount;
</script>

<style lang="scss" scoped>
.account {
  cursor: pointer;
  font-weight: 500;
}
</style>
