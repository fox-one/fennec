<template>
  <div v-if="show" class="text-center">
    <f-button color="primary" @click="handleSendAgain">
      {{ $t("send.again") }}
    </f-button>
  </div>
</template>

<script lang="ts">
import { SnapshotMeta } from "@foxone/fennec-ui/utils/activity";
import { Component, Vue, Prop } from "vue-property-decorator";
import { Sync } from "vuex-pathify";

@Component
class SnapshotSendAgain extends Vue {
  @Sync("page/send@transferForm") form;

  @Prop() snapshot!: SnapshotMeta;

  get show() {
    return +this.snapshot.amount < 0 && this.snapshot.type === "transfer";
  }

  handleSendAgain() {
    this.form = {
      asset: null,
      amount: "",
      opponent: "",
      memo: ""
    };

    this.$router.push({
      name: "send-transfer",
      query: {
        preset: this.snapshot.asset_id,
        opponent: this.snapshot.opponent_id,
        amount: Math.abs(+this.snapshot.amount).toString()
      }
    });
  }
}
export default SnapshotSendAgain;
</script>
