<template>
  <v-row>
    <v-col v-for="(item, index) in meta.profiles" :key="index" md="6">
      <account-backup-item :profile="item" />
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import AccountBackupItem from "./AccountBackupItem.vue";

import type { User } from "@foxone/mixin-api/types";

@Component({
  components: {
    AccountBackupItem
  }
})
class AccountBackupList extends Vue {
  get meta() {
    const profiles: User[] = this.$store.state.keyring.profiles;

    return { profiles };
  }
}
export default AccountBackupList;
</script>
