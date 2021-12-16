<template>
  <v-form v-model="valid">
    <input-field :label="$t('sending.asset')">
      <asset-amount-input
        v-model="bindForm.amount"
        :asset.sync="bindForm.asset"
        :rules="rules.asset"
      />
    </input-field>

    <input-field :label="$t('send.to')">
      <address-field
        :id.sync="bindForm.address_id"
        :clearable="false"
        :asset="bindForm.asset"
        :rules="rules.address"
        :address.sync="bindAddress"
      />
    </input-field>

    <div class="text-center mt-8">
      <f-button
        :loading="loading"
        :disabled="!valid"
        color="primary"
        @click="handleSend"
      >
        {{ $t("send") }}
      </f-button>
    </div>
  </v-form>
</template>

<script lang="ts">
import { Component, PropSync, Vue, Watch } from "vue-property-decorator";
import { WithdrawPayload, Withdrawal } from "@foxone/mixin-api/types";
import { v4 as uuid } from "uuid";
import AddressField from "./AddressField.vue";
import AssetAmountInput from "../asset/AssetAmountInput.vue";

@Component({
  components: {
    AddressField,
    AssetAmountInput
  }
})
class WithdrawForm extends Vue {
  @PropSync("form") bindForm;

  @PropSync("address") bindAddress;

  valid = false;

  loading = false;

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
      address: [(v) => !!v || this.$t("message.address.require")]
    };
  }

  @Watch("bindForm.asset", { deep: true })
  handleAssetChange() {
    this.bindForm.amount = "";
    this.bindForm.address_id = "";
    this.bindAddress = null;

    this.$router.replace({
      name: "send-withdraw",
      query: { preset: this.bindForm?.asset?.asset_id ?? "" }
    });
  }

  handleSend() {
    this.$utils.account.confirmPassword(this, {
      onSuccess: (password: string) => this.requestSend(password)
    });
  }

  handleToSnapshot(transfer: Withdrawal) {
    this.$router.push({
      name: "snapshot-id",
      params: { id: transfer.snapshot_id }
    });
  }

  handleSuccess() {
    this.bindForm.amount = "";
  }

  async requestSend(password: string) {
    this.loading = true;

    try {
      const pin = await this.$messages.getEncryptedPin(password);
      const opts: WithdrawPayload = {
        address_id: this.bindForm.address_id,
        amount: this.bindForm.amount,
        trace_id: uuid(),
        pin
      };

      const resp = await this.$endpoints.withdraw(opts);

      this.$uikit.toast.success({
        message: this.$t("message.send.successfully") as string
      });
      this.handleToSnapshot(resp);
      this.handleSuccess();
      this.$utils.asset.updateAsset(this, this.bindForm.asset.asset_id);
    } catch (error) {
      this.$utils.helper.errorToast(this, error);
    }

    this.loading = false;
  }
}
export default WithdrawForm;
</script>
