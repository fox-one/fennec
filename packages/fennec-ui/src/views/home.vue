<template>
  <div>
    <total-amount />

    <asset-actions class="mt-6" />

    <auth-error-warn />

    <f-panel padding="0" class="mt-8 details">
      <home-tabs v-model="category" />
      <asset-table v-show="category === 0" />
      <activity-table-home v-show="category === 1" />
    </f-panel>
  </div>
</template>

<script lang="ts">
import { Component, Mixins } from "vue-property-decorator";
import PageView from "../mixin/page";
import AssetActions from "../components/asset/AssetActions.vue";
import TotalAmount from "../components/home/TotalAmount.vue";
import AssetTable from "../components/asset/AssetTable.vue";
import ActivityTableHome from "../components/activity/ActivityTableHome.vue";
import HomeTabs from "../components/home/HomeTabs.vue";
import AuthErrorWarn from "../components/home/AuthErrorWarn.vue";
import { Sync } from "vuex-pathify";

@Component({
  components: {
    TotalAmount,
    AssetActions,
    AssetTable,
    ActivityTableHome,
    HomeTabs,
    AuthErrorWarn
  }
})
class HomePage extends Mixins(PageView) {
  @Sync("page/home@category") category!: number;

  search = "";

  get title() {
    return this.$t("home");
  }

  get appbar() {
    return {
      back: false
    };
  }

  get tabs() {
    return [{ text: this.$t("assets") }, { text: this.$t("activity") }];
  }
}
export default HomePage;
</script>

<style lang="scss" scoped>
.actions {
  min-height: 38px;
}

.details {
  overflow: hidden;
}
</style>
