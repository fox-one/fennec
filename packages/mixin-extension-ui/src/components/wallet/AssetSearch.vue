<template>
  <div class="asset-search">
    <v-text-field
      v-if="searching"
      :value="search"
      dense
      solo
      hide-details
      flat
      autofocus
      class="f-bg-greyscale-5"
      @input="(v) => $emit('change', v)"
    >
      <template #prepend-inner>
        <v-icon size="18">
          {{ $icons.mdiMagnify }}
        </v-icon>
      </template>
      <template #append>
        <v-icon size="18" @click="toggle">
          {{ $icons.mdiClose }}
        </v-icon>
      </template>
    </v-text-field>
    <v-btn v-else small icon @click="toggle">
      <v-icon size="18">
        {{ $icons.mdiMagnify }}
      </v-icon>
    </v-btn>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Model } from "vue-property-decorator";
import AssetList from "./AssetList.vue";

@Component({
  components: {
    AssetList
  }
})
class AssetSearch extends Vue {
  @Model("change") search!: string;

  searching = false;

  toggle() {
    this.$emit("change", "");
    this.searching = !this.searching;
  }
}
export default AssetSearch;
</script>
