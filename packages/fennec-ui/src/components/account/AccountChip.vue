<template>
  <v-chip color="bg_card" class="account">
    <v-avatar left>
      <v-img :src="meta.avatar" />
    </v-avatar>

    {{ meta.name }}
  </v-chip>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { GlobalGetters } from "../../store/types";
import AccountAvatar from "./AccountAvatar.vue";

@Component({
  components: {
    AccountAvatar
  }
})
class AccountChip extends Vue {
  get meta() {
    const currentProfile = this.$store.getters[GlobalGetters.CURRENT_PROFILE];
    const avatar = currentProfile?.avatar_url ?? "";
    const name = currentProfile?.full_name ?? "";

    return {
      avatar: avatar || require("../../assets/images/default-avatar.png"),
      name
    };
  }
}
export default AccountChip;
</script>
