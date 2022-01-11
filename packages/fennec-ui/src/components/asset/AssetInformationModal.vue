<template>
  <f-bottom-sheet
    v-model="dialog"
    wapper-in-desktop="dialog"
    :dialog-props="{ maxWidth: 327 }"
  >
    <template #activator="{ on }">
      <slot name="activator" :on="on" />
    </template>

    <div class="pa-4">
      <div class="dialog-title">
        {{ $t("info") }}
      </div>

      <div class="mt-8">
        <information-item
          v-for="(item, index) in meta.informations"
          :key="index"
          :title="item.title"
          :value="item.value"
        />

        <div class="asset-warning">{{ $t("asset.key.warning") }}</div>
      </div>
    </div>
  </f-bottom-sheet>
</template>

<script lang="ts">
import { GlobalGetters } from "@foxone/fennec-ui/store/types";
import { Asset } from "@foxone/mixin-api/types";
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import AssetLogo from "./AssetLogo.vue";

@Component({
  components: {
    AssetLogo
  }
})
class AssetInformationModal extends Vue {
  @Prop() asset!: Asset;

  dialog = false;

  get meta() {
    const getAsset = this.$store.getters[GlobalGetters.GET_ASSET_BY_ID];
    const chainAsset = getAsset(this.asset?.asset_id ?? "");

    const informations = [
      { title: this.$t("symbol"), value: this.asset?.symbol ?? "" },
      { title: this.$t("chain"), value: chainAsset?.name ?? "" },
      { title: this.$t("asset.key"), value: this.asset?.asset_key ?? "" }
    ];

    return {
      informations,
      name: this.asset?.name ?? ""
    };
  }

  @Watch("dialog")
  handleDialogChange(value) {
    if (value) {
      this.$emit("show");
    }
  }
}
export default AssetInformationModal;
</script>

<style lang="scss" scoped>
.dialog-title {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: 600;
}

.information-item {
  flex-direction: row !important;

  ::v-deep {
    .information-title {
      max-width: 80px;
      min-width: 80px;
      overflow: hidden;
      text-overflow: ellipsis;
      margin-right: 16px;
    }

    .information-value {
      text-align: left;
      margin-top: 0 !important;
    }
  }
}

.asset-warning {
  color: var(--v-warning-base);
  font-size: 12px;
  padding-left: 98px;
}
</style>
