<template>
  <v-btn
    rounded
    block
    depressed
    color="primary"
    class="mt-3"
    :loading="loading"
    @click="handleSelectAccount"
  >
    Select
  </v-btn>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { PerferenceStore } from "@foxone/mixin-extension-base/state/types";

@Component
class ActionSelectKeystore extends Vue {
  @Prop() id!: string;

  loading = false;

  get meta() {
    const preference: PerferenceStore = this.$store.state.preference.preference;
    const selectedAccount = preference.seletedAccount ?? "";
    return {
      selectedAccount
    };
  }

  async handleSelectAccount() {
    this.loading = true;
    this.$utils.account.selectAccount(this, this.id);
    this.$emit("completed");
    this.loading = false;
  }
}
export default ActionSelectKeystore;
</script>
