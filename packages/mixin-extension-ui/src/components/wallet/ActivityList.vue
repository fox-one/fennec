<template>
  <list-wapper :data="meta.activities" :loading="reloading">
    <v-list>
      <div v-for="(activity, index) in meta.activities" :key="index">
        <snapshot-list-item
          v-if="activity.component === 'snapshot'"
          :snapshot="activity"
        />
        <transaction-list-item v-else :item="activity" />
      </div>
    </v-list>
    <div
      v-if="!meta.infiniteDisabled"
      v-intersect="onLoadMoreIntersect"
      class="loadmore"
    >
      <f-loading :loading="true" size="24" />
    </div>
    <div
      v-if="meta.snapshotsLoaded"
      class="text-center text--secondary caption"
    >
      No more data
    </div>
  </list-wapper>
</template>

<script lang="ts">
import { Asset } from "@foxone/mixin-sdk/types";
import { Component, Vue, Prop } from "vue-property-decorator";
import {
  WalletModulePerfix,
  MutationTypes,
  ActionTypes,
  State
} from "../../store/modules/wallet/types";
import ListWapper from "../common/ListWarpper.vue";
import SnapshotListItem from "./SnapshotListItem.vue";
import TransactionListItem from "./TransactionListItem.vue";

@Component({
  components: {
    ListWapper,
    SnapshotListItem,
    TransactionListItem
  }
})
class ActivityList extends Vue {
  @Prop() asset!: Asset;

  reloading = false;

  loading = false;

  get meta() {
    const formatNumber = this.$utils.number.format;
    const formatTime = this.$utils.time.format;
    const currencyExchange = this.$utils.currency.currencyExchange;
    const getValueColor = this.$utils.color.getValueColor;
    const enums = this.$utils.enums;
    const snapshotTypeMetas = enums.snapshotTypeMetas(this);

    const state: State = this.$store.state.wallet;
    const snapshots = state.snapshots;
    const snapshotsLoaded = state.snapshotsLoaded;
    const transactions = state.transactions;

    const snapshotsMeta = snapshots.map((snapshot) => {
      const source = snapshotTypeMetas[snapshot.type];
      const amountUSD = Number(snapshot.amount) * Number(this.asset.price_usd);
      const amountFiat = currencyExchange(this, {
        n: Math.abs(amountUSD),
        from: "USD",
        to: "USD"
      });
      const isFrom = Number(snapshot.amount) > 0;
      const direction = isFrom ? "From" : "To";
      const amountText = `${
        Number(snapshot.amount) > 0 ? "+" : ""
      }${formatNumber({ n: snapshot.amount, p: 8 })}`;
      const amountColor = getValueColor(this, snapshot.amount);

      return {
        component: "snapshot",
        id: snapshot.snapshot_id,
        symbol: this.asset.symbol,
        icon: source.icon,
        text: source.text,
        time: formatTime({ t: snapshot.created_at, p: "MMM DD, YYYY" }),
        opponent: snapshot.opponent_id || snapshot.sender,
        created_at: snapshot.created_at,
        amountColor,
        amountFiat,
        amountText,
        direction
      };
    });

    const transactionsMeta = transactions.map((transaction) => {
      const confirmations = transaction.confirmations;
      const threshold = transaction.threshold;
      const progress = ((confirmations / threshold) * 100).toFixed();
      const amountText = `${
        Number(transaction.amount) > 0 ? "+" : ""
      }${formatNumber({ n: transaction.amount, p: 8 })}`;
      const amountColor = getValueColor(this, transaction.amount);
      const amountUSD =
        Number(transaction.amount) * Number(this.asset.price_usd);
      const amountFiat = currencyExchange(this, {
        n: Math.abs(amountUSD),
        from: "USD",
        to: "USD"
      });
      return {
        component: "transaction",
        id: transaction.transaction_id,
        symbol: this.asset.symbol,
        sender: transaction.sender,
        created_at: transaction.created_at,
        time: formatTime({ t: transaction.created_at, p: "MMM DD, YYYY" }),
        text: `${confirmations}/${threshold} Confirmations`,
        progress,
        amountColor,
        amountText,
        amountFiat
      };
    });

    const activities = [...snapshotsMeta, ...transactionsMeta].sort((x, y) => {
      return (
        new Date(y.created_at).getTime() - new Date(x.created_at).getTime()
      );
    });

    return {
      activities,
      snapshots,
      transactions,
      snapshotsLoaded,
      infiniteDisabled: this.loading || snapshotsLoaded
    };
  }

  mounted() {
    this.reloadActivities();
  }

  beforeDestroy() {
    const commit = this.$store.commit;
    commit(WalletModulePerfix + MutationTypes.SET_SNAPSHOTS, []);
    commit(WalletModulePerfix + MutationTypes.SET_SNAPSHOTS_LOADED, false);
  }

  handleToSnapshot(snapshot) {
    this.$router.push({ name: "snapshot-id", params: { id: snapshot.id } });
  }

  onLoadMoreIntersect(entries, observer, isIntersecting) {
    if (isIntersecting && !this.meta.infiniteDisabled) {
      this.loadActivities();
    }
  }

  async loadActivities() {
    this.loading = true;
    try {
      const dispatch = this.$store.dispatch;
      await dispatch(WalletModulePerfix + ActionTypes.LOAD_SNAPSHOTS, {
        reload: false,
        asset: this.asset.asset_id
      });
    } catch (error) {
      this.$utils.helper.errorToast(this, error);
    }
    this.loading = false;
  }

  async reloadActivities() {
    this.reloading = true;
    try {
      const dispatch = this.$store.dispatch;
      await dispatch(WalletModulePerfix + ActionTypes.LOAD_SNAPSHOTS, {
        reload: true,
        asset: this.asset.asset_id
      });
      if (this.asset.destination) {
        await dispatch(WalletModulePerfix + ActionTypes.LOAD_TRANSACTIONS, {
          reload: true,
          destination: this.asset.destination,
          tag: this.asset.tag
        });
      }
    } catch (error) {
      this.$utils.helper.errorToast(this, error);
    }
    this.reloading = false;
  }
}
export default ActivityList;
</script>

<style scoped>
.snapshot-subtitle {
  text-overflow: ellipsis;
  overflow: hidden;
}
</style>
