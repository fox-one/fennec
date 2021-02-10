<template>
  <div>
    <f-button-tabs v-model="index" grow>
      <template #tabs>
        <v-btn
          v-for="(item, index) in items"
          :key="index"
          :data-value="index"
          :ripple="false"
        >
          <span>{{ item.text }}</span>
        </v-btn>
      </template>
    </f-button-tabs>
    <keep-alive>
      <asset-list v-if="index === 0" />
      <activity-list v-if="index === 1" />
    </keep-alive>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import ActivityList from "./ActivityList.vue";
import AssetList from "./AssetList.vue";

@Component({
  components: {
    ActivityList,
    AssetList
  }
})
class WalletTabs extends Vue {
  index = 0;

  items = [{ text: "Assets" }, { text: "Activity" }];
}
export default WalletTabs;
</script>
