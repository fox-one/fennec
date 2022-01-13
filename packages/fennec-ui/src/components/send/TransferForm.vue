<template>
  <v-form v-model="valid" @submit.native.prevent>
    <input-field :label="$t('sending.asset')">
      <asset-amount-input
        v-model="bindForm.amount"
        :asset.sync="bindForm.asset"
        :rules="rules.asset"
      />
    </input-field>

    <input-field :label="$t('send.to')" class="mt-5">
      <contact-field
        :id="bindForm.opponent"
        :rules="rules.opponent"
        @clear="handleClear"
      />
    </input-field>

    <input-field :label="$t('memo')" class="mt-5">
      <f-input v-model="bindForm.memo" :placeholder="$t('optional')" />
    </input-field>

    <div class="text-center mt-5">
      <transfer-action
        :disabled="!valid"
        :payload="payload"
        @success="handleSuccess"
      />
    </div>
  </v-form>
</template>

<script lang="ts">
import { Component, PropSync, Vue, Watch } from "vue-property-decorator";
import { v4 as uuid } from "uuid";
import AssetAmountInput from "../asset/AssetAmountInput.vue";
import ContactField from "./ContactField.vue";
import TransferAction from "./TransferAction.vue";

@Component({
  components: {
    AssetAmountInput,
    ContactField,
    TransferAction
  }
})
class TransferForm extends Vue {
  @PropSync("form") bindForm;

  valid = false;

  get rules() {
    return {
      asset: [
        () => {
          if (!this.bindForm.amount || !this.bindForm.asset) {
            return this.$t("message.asset.or.amount.require");
          }

          if (+this.bindForm.amount <= 0) {
            return this.$t("message.amount.invalid");
          }

          return true;
        }
      ],
      opponent: [(v) => !!v || this.$t("message.opponent.require")]
    };
  }

  get payload() {
    const { amount, asset, memo, opponent } = this.bindForm;

    return {
      asset_id: asset?.id ?? "",
      opponent_id: opponent,
      amount,
      memo,
      trace_id: uuid()
    };
  }

  @Watch("bindForm.asset", { deep: true })
  handleAssetChange() {
    this.$router.replace({
      name: "send-transfer",
      query: { preset: this.bindForm?.asset?.asset_id ?? "" }
    });
  }

  handleClear() {
    this.bindForm.opponent = "";
  }

  handleSuccess() {
    this.bindForm.amount = "";
    this.bindForm.memo = "";
  }
}
export default TransferForm;
</script>
