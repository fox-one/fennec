<template>
  <input-field label="Wallet" class="mb-8">
    <v-layout align-center class="bg_card rounded pa-4 mb-4">
      <v-flex class="text-2">{{ $t("hide.small.assets") }}</v-flex>
      <f-switch v-model="hideSmallAssets" hide-details />
    </v-layout>
  </input-field>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Sync } from "vuex-pathify";

@Component
class WalletManage extends Vue {
  @Sync("app/settings@hideSmallAssets") hideSmallAssets;
}
export default WalletManage;
</script>
