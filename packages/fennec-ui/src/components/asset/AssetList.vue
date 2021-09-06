<template>
  <component :is="meta.component" v-bind="$attrs" v-on="$listeners" />
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import AssetListDesktop from "./AssetListDesktop.vue";
import AssetListPopup from "./AssetListPopup.vue";

@Component({
  inheritAttrs: false,
  components: {
    AssetListDesktop,
    AssetListPopup
  }
})
class AssetList extends Vue {
  get meta() {
    const smAndDown = this.$vuetify.breakpoint.smAndDown;
    const component = smAndDown ? "asset-list-popup" : "asset-list-desktop";

    return { smAndDown, component };
  }
}
export default AssetList;
</script>
