<template>
  <list-wapper :data="meta.snapshots" :loading="reloading">
    <v-list>
      <v-list-item
        v-for="(snapshot, index) in meta.snapshots"
        :key="index"
        class="px-0"
        @click="handleToSnapshot(snapshot)"
      >
        <span class="mr-2">
          <v-img width="18" height="18" :src="snapshot.icon" />
        </span>
        <v-list-item-content>
          <v-list-item-title>
            <span class="f-body-1">{{ snapshot.text }}</span>
          </v-list-item-title>
          <v-list-item-subtitle>
            <div class="f-caption text--secondary snapshot-subtitle">
              <span>
                {{ snapshot.time }}
              </span>
              <span> From {{ snapshot.opponent }} </span>
            </div>
          </v-list-item-subtitle>
        </v-list-item-content>
        <div class="text-right ml-3">
          <div class="f-body-1">
            <span>{{ snapshot.amount }}</span>
            <span>{{ snapshot.symbol }}</span>
          </div>
          <div class="f-caption text--secondary">
            <span>{{ snapshot.amountFiat }}</span>
          </div>
        </div>
      </v-list-item>
    </v-list>
  </list-wapper>
</template>

<script lang="ts">
import { Asset, Snapshot, Transaction } from "@foxone/mixin-sdk/types";
import { Component, Vue, Prop } from "vue-property-decorator";
import { WalletModuleKey, ActionTypes } from "../../store/modules/wallet/types";
import ListWapper from "../hoc/ListWarpper.vue";

@Component({
  components: {
    ListWapper
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
    const enums = this.$utils.enums;
    const snapshotTypeMetas = enums.snapshotTypeMetas(this);

    const snapshots: Snapshot[] = this.$store.state.wallet.snapshots;
    // const transactions: Transaction[] = this.$store.state.wallet.transactions;

    const snapshotsMeta = snapshots.map((snapshot) => {
      const source = snapshotTypeMetas[snapshot.type];
      const amountUSD = Number(snapshot.amount) * Number(this.asset.price_usd);
      const amountFiat = currencyExchange(this, {
        n: amountUSD,
        from: "USD",
        to: "USD"
      });

      return {
        id: snapshot.snapshot_id,
        amount: formatNumber({ n: snapshot.amount }),
        symbol: this.asset.symbol,
        icon: source.icon,
        text: source.text,
        time: formatTime({ t: snapshot.created_at, p: "MMM DD, YYYY" }),
        opponent: snapshot.opponent || snapshot.opponent_id,
        amountFiat
      };
    });

    return {
      snapshots: snapshotsMeta
    };
  }

  mounted() {
    this.reloadActivities();
  }

  handleToSnapshot(snapshot) {
    this.$router.push({ name: "snapshot-id", params: { id: snapshot.id } });
  }

  async reloadActivities() {
    this.reloading = true;
    try {
      const dispatch = this.$store.dispatch;
      await Promise.all([
        dispatch(WalletModuleKey + ActionTypes.LOAD_SNAPSHOTS, {
          reload: true,
          asset: this.asset.asset_id
        }),
        dispatch(WalletModuleKey + ActionTypes.LOAD_TRANSACTIONS, {
          reload: true,
          destination: this.asset.destination,
          tag: this.asset.tag
        })
      ]);
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
