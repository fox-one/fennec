<template>
  <list-wapper :data="meta.snapshots" :loading="reloading || loading">
    <v-list>
      <v-list-item v-for="(snapshot, index) in meta.snapshots" :key="index">
        <span>
          <v-img :src="snapshot.icon" />
        </span>
        <v-list-item-content>
          <v-list-item-title>
            <span class="f-body-1">{{ snapshot.text }}</span>
          </v-list-item-title>
          <v-list-item-subtitle>
            <div class="f-body-2 text--secondary">
              <span>
                {{ snapshot.time }}
              </span>
              <span> From {{ snapshot.opponent }} </span>
            </div>
          </v-list-item-subtitle>
        </v-list-item-content>
        <div class="text-right">
          <div class="f-body-1">
            <span>{{ snapshot.amount }}</span>
            <span>{{ snapshot.symbol }}</span>
          </div>
          <div class="f-body-2 text--secondary">
            <span>{{ snapshot.amount }}</span>
            <span>{{ snapshot.symbol }}</span>
          </div>
        </div>
      </v-list-item>
    </v-list>
  </list-wapper>
</template>

<script lang="ts">
import { Snapshot, Transaction } from "@foxone/mixin-sdk/types";
import { Component, Vue } from "vue-property-decorator";
import { WalletModuleKey, ActionTypes } from "../../store/modules/wallet/types";
import ListWapper from "../hoc/ListWarpper.vue";

@Component({
  components: {
    ListWapper
  }
})
class ActivityList extends Vue {
  reloading = false;

  loading = false;

  get meta() {
    const formatNumber = this.$utils.number.format;
    const formatTime = this.$utils.time.format;
    const enums = this.$utils.enums;
    const snapshotSourceMetas = enums.snapshotSourceMeta(this);

    const snapshots: Snapshot[] = this.$store.state.wallet.snapshots;
    // const transactions: Transaction[] = this.$store.state.wallet.transactions;

    const snapshotsMeta = snapshots.map((snapshot) => {
      const source = snapshotSourceMetas[snapshot.source];
      return {
        amount: formatNumber({ n: snapshot.amount }),
        symbol: snapshot.asset.symbol,
        icon: source.icon,
        text: source.text,
        time: formatTime({ t: snapshot.created_at, p: "MMM DD, YYYY" }),
        opponent: snapshot.opponent_id
      };
    });

    return {
      snapshots: snapshotsMeta
    };
  }

  async reloadActivities() {
    this.reloading = true;
    try {
      const dispatch = this.$store.dispatch;
      await Promise.all([
        dispatch(WalletModuleKey + ActionTypes.LOAD_SNAPSHOTS, {
          reload: true
        })
        // dispatch(WalletModuleKey + ActionTypes.LOAD_TRANSACTIONS, {
        //   reload: true
        // })
      ]);
    } catch (error) {
      this.$utils.helper.errorToast(this, error);
    }
    this.reloading = false;
  }

  mounted() {
    this.reloadActivities();
  }
}
export default ActivityList;
</script>
