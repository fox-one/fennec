<template>
  <activity-table key="activity-table-home" @next="handleNext" />
</template>

<script lang="ts">
import { GlobalActions } from "@foxone/fennec-ui/store/types";
import { Component, Vue, ProvideReactive, Watch } from "vue-property-decorator";
import ActivityTable from "./ActivityTable.vue";

@Component({
  components: {
    ActivityTable
  }
})
class ActivityTableHome extends Vue {
  error = false;

  @ProvideReactive()
  loading = false;

  @ProvideReactive()
  get end() {
    return this.$store.state.activity.globalSnapshotsEnd;
  }

  @ProvideReactive()
  get empty() {
    return this.$store.state.activity.globalSnapshots.length === 0;
  }

  get meta() {
    const preference = this.$store.state.preference.preference;
    const selectedAccount = preference.selectedAccount;

    return { selectedAccount };
  }

  mounted() {
    this.loadData(true);
  }

  handleNext() {
    this.loadData(false);
  }

  @Watch("meta.selectedAccount")
  handleReload() {
    this.loadData(true);
  }

  async loadData(reload) {
    this.loading = true;

    try {
      if (reload) {
        await this.$store.dispatch(GlobalActions.LOAD_GLOBAL_SNAPSHOTS, {
          reload: true
        });
      } else {
        await this.$store.dispatch(GlobalActions.LOAD_GLOBAL_SNAPSHOTS);
      }
    } catch (error) {
      this.error = true;
    }

    this.loading = false;
  }
}
export default ActivityTableHome;
</script>
