<template>
  <v-list-item>
    <v-list-item-content>
      <v-list-item-title>
        {{ provider.value }}
      </v-list-item-title>
      <v-list-item-subtitle>
        {{ provider.type }}
      </v-list-item-subtitle>
    </v-list-item-content>
    <v-list-item-action>
      <v-btn
        v-if="meta.canRemove"
        small
        text
        color="error"
        :loading="loading"
        @click.stop="handleRemove(index)"
      >
        Remove
      </v-btn>
    </v-list-item-action>
  </v-list-item>
</template>

<script lang="ts">
import { AccountProvider } from "@foxone/fennec-base/state/types";
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
class AccountProviderItem extends Vue {
  @Prop() providers!: AccountProvider[];

  @Prop() provider!: AccountProvider;

  @Prop() index!: number;

  loading = false;

  get meta() {
    return {
      canRemove: this.provider.type === "custom"
    };
  }

  async handleRemove() {
    this.loading = true;
    const providers = this.providers.concat();

    providers.splice(this.index, 1);

    try {
      await this.$messages.updateAccountProviders(providers);
      this.$emit("reload");
    } catch (error) {
      this.$utils.helper.errorToast(this, error);
    }

    this.loading = false;
  }
}
export default AccountProviderItem;
</script>
