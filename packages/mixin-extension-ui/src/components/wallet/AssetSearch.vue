<template>
  <f-bottom-sheet v-model="dialog">
    <template #activator="{ on }">
      <v-btn small icon v-on="on">
        <v-icon size="18">
          {{ $icons.mdiMagnify }}
        </v-icon>
      </v-btn>
    </template>
    <template #title> Search asset </template>
    <template #subheader>
      <v-text-field
        v-model="search"
        dense
        solo
        hide-details
        flat
        background-color="transparent"
        placeholder="Search"
        class="f-bg-greyscale-6"
      />
    </template>
    <div class="px-3">
      <asset-list :filter="search" />
    </div>
  </f-bottom-sheet>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import AssetList from "./AssetList.vue";

@Component({
  components: {
    AssetList
  }
})
class AssetSearch extends Vue {
  search = "";

  dialog = false;
}
export default AssetSearch;
</script>
