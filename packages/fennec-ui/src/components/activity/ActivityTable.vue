<template>
  <component
    :is="meta.component"
    :activities="meta.activities"
    v-bind="$attrs"
    v-on="$listeners"
  />
</template>

<script lang="ts">
import { Asset } from "@foxone/mixin-api/types";
import { Component, Vue, Prop } from "vue-property-decorator";
import {
  getSnapshotMeta,
  getExternalTransactionMeta
} from "../../utils/activity";
import ActivityListDesktop from "./ActivityListDesktop.vue";
import ActivityListPopup from "./ActivityListPopup.vue";

@Component({
  components: {
    ActivityListDesktop,
    ActivityListPopup
  }
})
class ActivityTable extends Vue {
  @Prop() asset!: Asset;

  get meta() {
    const isDesktop = !this.$vuetify.breakpoint.smAndDown;

    const state = this.$store.state.activity;
    const getTime = (t) => new Date(t).getTime();
    const snapshots = this.asset ? state.snapshots : state.globalSnapshots;
    const snapshotMetas = snapshots.map((x) => getSnapshotMeta(this, x));
    const transactions = this.asset ? state.transactions : [];
    const transactionMetas = transactions.map((x) =>
      getExternalTransactionMeta(this, x)
    );
    const activities = [...snapshotMetas, ...transactionMetas].sort((x, y) => {
      return getTime(y.created_at) - getTime(x.created_at);
    });
    const component = isDesktop
      ? "activity-list-desktop"
      : "activity-list-popup";

    return {
      isDesktop,
      activities,
      component
    };
  }
}
export default ActivityTable;
</script>
