<template>
  <v-row>
    <v-col v-for="(item, index) in meta.providers" :key="index" md="6">
      <account-provider-item
        :provider="item"
        @remove="handleRemove"
        @click.native="handleSelect(item)"
      />
    </v-col>

    <v-col md="6">
      <div class="provider-add bg_card rounded">
        <v-btn icon small @click="handleToProviderAdd">
          <v-icon>$FIconAdd</v-icon>
        </v-btn>
      </div>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { PreferenceStore } from "@foxone/fennec-base/state/types";
import { Component, Vue } from "vue-property-decorator";
import AccountProviderItem from "./AccountProviderItem.vue";
import { Sync } from "vuex-pathify";

@Component({
  components: {
    AccountProviderItem
  }
})
class AccountProviderList extends Vue {
  @Sync("app/settings@provider") provider!: string;

  get meta() {
    const preference: PreferenceStore = this.$store.state.preference.preference;
    const providers = preference.accountProviders;

    return { providers };
  }

  async handleRemove(item) {
    let providers = this.meta.providers.concat();

    providers = providers.filter((x) => x.value !== item.value);

    try {
      await this.$messages.updateAccountProviders(providers);

      if (this.provider === item.value) {
        this.provider = this.meta.providers?.[0]?.value || "";
      }

      this.$uikit.toast.success({
        message: this.$t("message.remove.provider.successfully") as string
      });
    } catch (error) {
      this.$utils.helper.errorToast(this, error);
    }
  }

  handleSelect(item) {
    this.provider = item.value;
    this.$router.back();
  }

  handleToProviderAdd() {
    this.$router.push({ name: "account-provider-add" });
  }
}
export default AccountProviderList;
</script>

<style lang="scss" scoped>
.provider-add {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  min-height: 90px;
}
</style>
