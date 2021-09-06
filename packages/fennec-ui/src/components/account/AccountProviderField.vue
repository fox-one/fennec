<template>
  <v-layout class="provider rounded">
    <v-flex class="type">
      <div class="url">{{ provider }}</div>
      <div class="text-3 label--text">{{ meta.providerTypeText }}</div>
    </v-flex>

    <v-btn icon small @click="handleToProviders">
      <v-icon> $FIconMoreVertical </v-icon>
    </v-btn>
  </v-layout>
</template>

<script lang="ts">
import { PreferenceStore } from "@foxone/fennec-base/state/types";
import { Component, Vue } from "vue-property-decorator";
import { Sync } from "vuex-pathify";

@Component
class AccountProviderField extends Vue {
  @Sync("app/settings") settings!: State.Settings;

  dialog = false;

  get provider() {
    return this.settings.provider;
  }

  get meta() {
    const preference: PreferenceStore = this.$store.state.preference.preference;
    const providers = preference.accountProviders;
    const provider = providers.find((x) => x.value === this.provider);

    const providerTypeText =
      provider?.type === "built-in" ? "Built-in Host" : "Custom";

    return {
      providers,
      providerTypeText
    };
  }

  mounted() {
    if (!this.provider) {
      this.settings = {
        ...this.settings,
        provider: this.meta.providers[0].value
      };
    }
  }

  handleToProviders() {
    this.$router.push({ name: "account-provider" });
  }
}
export default AccountProviderField;
</script>

<style lang="scss" scoped>
.provider {
  min-height: 58px;
  display: flex;
  align-items: center;
  padding: 8px 12px;
  cursor: pointer;
  background-color: var(--v-bg_card-base);

  &:hover {
    background-color: var(--v-bg_hover-base);
  }

  .url {
    word-break: break-all;
    font-weight: 600;
  }

  .value {
    white-space: nowrap;
    word-break: break-all;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
</style>
