<template>
  <div class="pa-4 rounded provider" :class="classes">
    <v-layout class="text-1">
      <v-flex>{{ meta.typeText }} </v-flex>
      <span>
        <v-btn
          v-if="meta.custom"
          small
          icon
          color="error"
          @click.stop="handleRemove"
        >
          <v-icon>$IconRemove</v-icon>
        </v-btn>

        <v-btn
          v-if="meta.custom"
          icon
          small
          class="icon"
          @click.stop="handleToEdit"
        >
          <v-icon>$IconEdit</v-icon>
        </v-btn>
      </span>
    </v-layout>
    <div class="label-1 mt-4">{{ provider.value }}</div>
  </div>
</template>

<script lang="ts">
import { AccountProvider } from "@foxone/fennec-base/state/types";
import { Component, Prop, Vue } from "vue-property-decorator";
import { Get } from "vuex-pathify";

@Component
class AccountProviderItem extends Vue {
  @Get("app/settings@provider") current!: string;

  @Prop() provider!: AccountProvider;

  get meta() {
    return {
      typeText: this.provider.type === "built-in" ? "Built-in Host" : "Custom",
      custom: this.provider && this.provider.type === "custom"
    };
  }

  get classes() {
    return { "provider--active": this.current === this.provider.value };
  }

  handleRemove() {
    this.$emit("remove", this.provider);
  }

  handleToEdit() {
    this.$router.push({
      name: "account-provider-edit",
      query: { value: encodeURIComponent(this.provider.value) }
    });
  }
}
export default AccountProviderItem;
</script>

<style lang="scss" scoped>
.provider {
  position: relative;
  cursor: pointer;
  height: 100%;
  background-color: var(--v-bg_card-base);

  &:hover {
    background-color: var(--v-bg_hover-base);
  }
}

.provider--active {
  border: 2px solid var(--v-primary-base);
}
</style>
