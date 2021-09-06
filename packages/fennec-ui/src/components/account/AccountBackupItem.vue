<template>
  <v-layout class="account bg_card pa-4 rounded">
    <div class="mr-4">
      <account-avatar :url="profile.avatar_url" :size="24" />
    </div>
    <v-flex>
      <v-layout>
        <v-flex class="text-1">{{ profile.full_name }}</v-flex>

        <action-back-up-keystore :id="profile.user_id">
          <template #activator="{ on, loading }">
            <v-btn icon small :loading="loading" v-on="on">
              <v-icon>$FIconFile</v-icon>
            </v-btn>
          </template>
        </action-back-up-keystore>
      </v-layout>
      <div class="label-1 mt-4">{{ profile.user_id }}</div>
    </v-flex>
  </v-layout>
</template>

<script lang="ts">
import { User } from "@foxone/mixin-api/types";
import { Component, Vue, Prop } from "vue-property-decorator";
import ActionBackUpKeystore from "./ActionBackupKeystore.vue";
import AccountAvatar from "./AccountAvatar.vue";

@Component({
  components: {
    AccountAvatar,
    ActionBackUpKeystore
  }
})
class AccountBackupItem extends Vue {
  @Prop() profile!: User;
}
export default AccountBackupItem;
</script>

<style scoped>
.account {
  min-height: 110px;
}
</style>
