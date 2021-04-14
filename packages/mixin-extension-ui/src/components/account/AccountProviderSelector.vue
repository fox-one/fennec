<template>
  <f-bottom-sheet v-model="dialog">
    <template #activator="{ on }">
      <div v-on="on" class="provider f-bg-greyscale-5">
        <v-layout v-if="provider" class="d-flex align-center provider-content">
          <v-flex>
            <div class="value f-body-1">
              {{ provider.value }}
            </div>
            <div class="type f-caption text--secondary">
              {{ provider.type }}
            </div>
          </v-flex>
          <v-icon>
            {{ $icons.mdiChevronDown }}
          </v-icon>
        </v-layout>
        <div v-else class="text--secondary">Select a provider</div>
      </div>
    </template>
    <template #title> Select Provider </template>
    <v-list>
      <account-provider-item
        v-for="(provider, index) in meta.providers"
        :key="index"
        :index="index"
        :provider="provider"
        :providers="meta.providers"
        @click.native="handleSelect(provider)"
      />
      <div class="pa-5 pb-0">
        <account-provider-add />
      </div>
    </v-list>
  </f-bottom-sheet>
</template>

<script lang="ts">
import {
  AccountProvider,
  PerferenceStore
} from "@foxone/mixin-extension-base/state/types";
import { Component, Model, Vue } from "vue-property-decorator";
import AccountProviderAdd from "./AccountProviderAdd.vue";
import AccountProviderItem from "./AccountProviderItem.vue";

@Component({
  components: {
    AccountProviderAdd,
    AccountProviderItem
  }
})
class AccountProviderSelector extends Vue {
  @Model("change") provider!: AccountProvider | null;

  dialog = false;

  get meta() {
    const preference: PerferenceStore = this.$store.state.preference.preference;
    const providers = preference.accountProviders;
    return {
      providers
    };
  }

  mounted() {
    this.$emit("change", this.meta.providers[0]);
  }

  handleSelect(item: AccountProvider) {
    this.$emit("change", item);
    this.dialog = false;
  }
}
export default AccountProviderSelector;
</script>

<style lang="scss" scoped>
.provider {
  height: 58px;
  border-radius: 4px;
  padding: 0 16px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: left;

  .provider-content {
    max-width: calc(100% - 16px);
  }

  .value {
    white-space: nowrap;
    word-break: break-all;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
</style>
