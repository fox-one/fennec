<template>
  <v-menu
    v-model="menu"
    offset-y
    nudge-top="-10"
    :close-on-content-click="false"
  >
    <template #activator="{ on }">
      <v-btn v-if="show" small icon v-on="on">
        <v-icon> $FIconMoreVertical </v-icon>
      </v-btn>
    </template>

    <div>
      <action-field
        icon="$IconRemove"
        class="error"
        @click.native="handleRemove"
      >
        <div class="mr-6">Remove Asset</div>
      </action-field>
    </div>
  </v-menu>
</template>

<script lang="ts">
import { GlobalMutations } from "@foxone/fennec-ui/store/types";
import { Asset } from "@foxone/mixin-api/types";
import { Component, Vue, Prop } from "vue-property-decorator";

@Component
class AssetMenuPopup extends Vue {
  @Prop() asset!: Asset;

  menu = false;

  get show() {
    const addtions = this.$store.state.wallet.additionAssets;

    return addtions.find((x) => x.asset_id === this.asset?.asset_id);
  }

  handleRemove() {
    this.menu = false;
    this.$store.commit(GlobalMutations.REMVOE_ADDITION_ASSET, this.asset);
    this.$router.push({ name: "home" });
  }
}
export default AssetMenuPopup;
</script>
