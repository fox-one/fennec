<template>
  <v-menu
    v-model="menu"
    offset-y
    nudge-top="-10"
    :close-on-content-click="false"
  >
    <template #activator="{ on }">
      <v-btn small icon v-on="on">
        <v-icon> $FIconMoreVertical </v-icon>
      </v-btn>
    </template>

    <div class="bg_card actions-card">
      <asset-information-modal :asset="asset" @show="handleShowInfo">
        <template #activator="{ on }">
          <action-field
            icon="$IconInfo"
            icon-size="16"
            @click.native="on.click"
          >
            <div class="mr-6">{{ $t("info") }}</div>
          </action-field>
        </template>
      </asset-information-modal>

      <action-field
        v-if="showRemove"
        icon="$FIconTrash4P"
        icon-size="16"
        class="error--text remove-action"
        @click.native="handleRemove"
      >
        <div class="mr-6">
          {{ $t("remove.asset") }}
        </div>
      </action-field>
    </div>
  </v-menu>
</template>

<script lang="ts">
import { GlobalMutations } from "@foxone/fennec-ui/store/types";
import { Asset } from "@foxone/mixin-api/types";
import { Component, Vue, Prop } from "vue-property-decorator";
import AssetInformationModal from "./AssetInformationModal.vue";

@Component({
  components: {
    AssetInformationModal
  }
})
class AssetMenuPopup extends Vue {
  @Prop() asset!: Asset;

  menu = false;

  get showRemove() {
    const addtions = this.$store.state.wallet.additionAssets;

    return addtions.find((x) => x.asset_id === this.asset?.asset_id);
  }

  handleRemove() {
    this.menu = false;

    this.$uikit.dialog.show({
      title: this.$t("remove.asset.title") as string,
      text: this.$t("remove.asset.text") as string,
      cancel: {
        callback: () => {
          this.menu = false;
        }
      },
      confirm: {
        callback: () => {
          this.$store.commit(GlobalMutations.REMVOE_ADDITION_ASSET, this.asset);
          this.$router.push({ name: "home" });
        }
      }
    });
  }

  handleShowInfo() {
    this.menu = false;
  }
}
export default AssetMenuPopup;
</script>

<style lang="scss" scoped>
.remove-action {
  ::v-deep {
    .v-icon {
      color: var(--v-error-base);
    }
  }
}

.action {
  font-size: 14px;
  line-height: 14px;
}

.actions-card {
  min-width: 160px;
}
</style>
