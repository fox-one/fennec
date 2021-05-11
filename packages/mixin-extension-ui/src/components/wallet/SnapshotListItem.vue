<template>
  <v-list-item class="px-0" @click="handleToSnapshot(snapshot)">
    <span class="mr-2">
      <v-img width="18" height="18" :src="snapshot.icon" />
    </span>
    <v-list-item-content>
      <v-list-item-title>
        <span class="f-body-2">{{ snapshot.text }}</span>
      </v-list-item-title>
      <v-list-item-subtitle>
        <div class="f-caption text--secondary snapshot-subtitle">
          <span>
            {{ snapshot.time }}
          </span>
          <span>
            {{ snapshot.direction }} {{ opponentName || snapshot.opponent }}
          </span>
        </div>
      </v-list-item-subtitle>
    </v-list-item-content>
    <div class="text-right ml-3">
      <div>
        <span
          :style="{ color: snapshot.amountColor }"
          class="f-body-1 font-weight-bold"
        >
          {{ snapshot.amountText }}
        </span>
        <span class="f-caption">{{ snapshot.symbol }}</span>
      </div>
      <div class="f-caption text--secondary">
        <span>{{ snapshot.amountFiat }}</span>
      </div>
    </div>
  </v-list-item>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import {
  WalletModulePerfix,
  ActionTypes
} from "../../store/modules/wallet/types";

@Component
class SnapshotListItem extends Vue {
  @Prop() snapshot;

  opponentName = "";

  mounted() {
    this.requestOpponentName();
  }

  handleToSnapshot(snapshot) {
    this.$router.push({ name: "snapshot-id", params: { id: snapshot.id } });
  }

  async requestOpponentName() {
    try {
      const user = await this.$store.dispatch(
        WalletModulePerfix + ActionTypes.LOAD_USER,
        { id: this.snapshot?.opponent }
      );
      this.opponentName = user.full_name;
    } catch (error) {}
  }
}
export default SnapshotListItem;
</script>

<style lang="scss" scoped>
.snapshot-subtitle {
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
