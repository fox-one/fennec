<template>
  <f-bottom-sheet v-model="dialog">
    <template #activator="{ on }">
      <v-icon v-on="on" size="18">
        {{ $icons.mdiPencilBox }}
      </v-icon>
    </template>
    <template #title> Account Actions </template>
    <div class="pa-5">
      <v-btn
        rounded
        block
        depressed
        outlined
        color="primary"
        @click="handleImport"
      >
        Import Account
      </v-btn>
      <v-btn
        rounded
        block
        depressed
        color="primary"
        class="mt-3"
        @click="handleToBackup"
      >
        Backup Account
      </v-btn>
    </div>
  </f-bottom-sheet>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
class AccountsActions extends Vue {
  dialog = false;

  handleImport() {
    this.$router.push({ name: "import" });
  }

  handleToBackup() {
    this.$router.push({ name: "backup" });
  }
}
export default AccountsActions;
</script>
