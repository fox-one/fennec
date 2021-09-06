<template>
  <div>
    <f-loading v-if="loading" :loading="loading" fullscreen />
    <template v-if="snapshot">
      <snapshot-amount :snapshot="snapshot" />

      <snapshot-details
        :snapshot="snapshot"
        :created-price="createdPrice"
        class="mt-8"
      />

      <snapshot-send-again :snapshot="snapshot" class="mt-8" />
    </template>
  </div>
</template>

<script lang="ts">
import { GlobalActions, GlobalMutations } from "../../store/types";
import { Asset, Ticker } from "@foxone/mixin-api/types";
import { Component, Mixins, Watch } from "vue-property-decorator";
import PageView from "../../mixin/page";
import SnapshotAmount from "../../components/snapshot/SnapshotAmount.vue";
import SnapshotDetails from "../../components/snapshot/SnapshotDetails.vue";
import SnapshotSendAgain from "../../components/snapshot/SnapshotSendAgain.vue";
import AssetLogo from "../../components/asset/AssetLogo.vue";
import { getSnapshotMeta, SnapshotMeta } from "../../utils/activity";

@Component({
  components: {
    SnapshotAmount,
    SnapshotDetails,
    SnapshotSendAgain
  },
  beforeRouteLeave(to, from, next) {
    this.$store.commit(GlobalMutations.SET_SNAPSHOT_DETAIL, null);

    next();
  }
})
class SnapshotPage extends Mixins(PageView) {
  loading = false;

  snapshot: SnapshotMeta | null = null;

  createdPrice: Ticker | null = null;

  get title(): any {
    return this.meta.text;
  }

  get titleNode() {
    const h = this.$createElement;
    const { asset, text } = this.meta;

    return h("div", { class: { "snapshot-nav-title": true } }, [
      h(AssetLogo, { props: { small: true, asset }, attrs: { size: 24 } }),
      h("span", { staticClass: "ml-2" }, text)
    ]);
  }

  get id() {
    return this.$route.params.id;
  }

  get type() {
    return this.$route.query.type;
  }

  get meta() {
    const asset: Asset | null = this.snapshot?.asset ?? null;
    const text = this.snapshot?.text ?? "";

    return { asset, text };
  }

  async mounted() {
    if (this.type === "transaction") {
      this.snapshot = this.$store.state.page.snapshot.detail;
    } else {
      await this.requestSnapshotDetail();
    }

    await this.requestCreatedTicker();
  }

  @Watch("snapshot")
  handleSnapshotChange() {
    this.setProperties();
  }

  async requestSnapshotDetail() {
    this.loading = true;

    try {
      const snapshot = await this.$endpoints.getSnapshot(this.id);

      this.snapshot = getSnapshotMeta(this, snapshot);
      this.$store.dispatch(GlobalActions.LOAD_USER, {
        id: this.snapshot?.opponent_id
      });
    } catch (error) {
      this.$utils.helper.errorToast(this, error);
    }

    this.loading = false;
  }

  async requestCreatedTicker() {
    if (!this.snapshot) {
      return;
    }

    try {
      this.createdPrice = await this.$endpoints.ticker({
        asset: this.snapshot?.asset_id,
        offset: this.snapshot.created_at
      });
    } catch (error) {
      this.$utils.helper.errorToast(this, error);
    }
  }
}
export default SnapshotPage;
</script>

<style lang="scss">
.snapshot-nav-title {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
