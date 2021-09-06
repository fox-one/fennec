<template>
  <div class="asset-actions" :class="classes.actions">
    <div class="action-item" :class="classes.action" @click="handleDeposit">
      <v-btn fab small color="#ffffff">
        <v-icon color="bg">$FIconArrowDownBold</v-icon>
      </v-btn>

      <div class="action-text">Receive</div>
    </div>

    <send-method-modal :asset="asset">
      <template #activator="{ on }">
        <div class="action-item px-5" :class="classes.action" @click="on.click">
          <v-btn fab small color="#ffffff">
            <v-icon color="bg" class="icon-up">$FIconArrowDownBold</v-icon>
          </v-btn>

          <div class="action-text">Send</div>
        </div>
      </template>
    </send-method-modal>

    <div class="action-item px-5" :class="classes.action" @click="handleToSwap">
      <v-btn fab small color="#ffffff">
        <v-icon color="bg">$FIconConvertDirectionBold</v-icon>
      </v-btn>

      <div class="action-text">Swap</div>
    </div>
  </div>
</template>

<script lang="ts">
import { Asset } from "@foxone/mixin-api/types";
import { Component, Vue, Prop } from "vue-property-decorator";
import { FSWAP_URL } from "../../defaults";
import SendMethodModal from "../send/SendMethodModal.vue";

@Component({
  components: {
    SendMethodModal
  }
})
class AssetActions extends Vue {
  @Prop() asset!: Asset | undefined;

  get classes() {
    const smAndDown = this.$vuetify.breakpoint.smAndDown;

    return {
      action: { "action-item--popup": smAndDown },
      actions: { "asset-actions--popup": smAndDown }
    };
  }

  get swapUrl() {
    if (this.asset) {
      return FSWAP_URL + `?input=${this.asset.asset_id}`;
    }

    return FSWAP_URL;
  }

  handleToSwap() {
    window.open(this.swapUrl, "_blank");
  }

  handleDeposit() {
    this.$router.push({
      name: "deposit",
      query: { preset: this.asset?.asset_id ?? "" }
    });
  }
}
export default AssetActions;
</script>

<style scoped lang="scss">
.asset-actions {
  display: flex;

  &--popup {
    justify-content: center;
  }
}

.action-item {
  display: flex;
  align-items: center;
  padding: 16px;
  margin-right: 16px;
  border-radius: 16px;
  background: var(--v-bg_card-base);
  cursor: pointer;

  &--popup {
    background: none;
    flex-direction: column;
    padding: 0 16px;

    .action-text {
      margin-left: 0;
      font-size: 12px;
      margin-top: 8px;
    }
  }
}

.action-text {
  margin-left: 16px;
  font-weight: 500;
}

.icon-up {
  transform: rotate(180deg);
}
</style>
