<template>
  <activity-table
    key="activity-table-detail"
    :asset="asset"
    :loading="loading"
    @next="handleNext"
  />
</template>

<script lang="ts">
import { Asset } from "@foxone/mixin-api/types";
import { GlobalActions } from "@foxone/fennec-ui/store/types";
import { Component, Vue, Prop, ProvideReactive } from "vue-property-decorator";
import ActivityTable from "./ActivityTable.vue";

@Component({
  components: {
    ActivityTable
  }
})
class ActivityTableDetail extends Vue {
  @Prop() asset!: Asset;

  error = false;

  @ProvideReactive()
  loading = false;

  @ProvideReactive()
  get end() {
    return this.$store.state.activity.snapshotsEnd;
  }

  @ProvideReactive()
  get empty() {
    return this.$store.state.activity.snapshots.length === 0;
  }

  mounted() {
    this.loadData(true);
  }

  handleNext() {
    this.loadData(false);
  }

  async loadData(reload) {
    this.loading = true;

    try {
      if (reload) {
        await this.$store.dispatch(GlobalActions.LOAD_SNAPSHOTS, {
          reload: true,
          asset: this.asset?.asset_id ?? ""
        });
        await this.$store.dispatch(GlobalActions.LOAD_TRANSACTIONS, {
          destination: this.asset.destination,
          tag: this.asset.tag
        });
      } else {
        await this.$store.dispatch(GlobalActions.LOAD_SNAPSHOTS, {
          asset: this.asset?.asset_id ?? ""
        });
      }
    } catch (error) {
      this.error = true;
    }

    this.loading = false;
  }
}
export default ActivityTableDetail;
</script>
