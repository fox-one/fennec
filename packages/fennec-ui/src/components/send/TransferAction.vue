<template>
  <f-button
    :disabled="disabled"
    :loading="loading"
    color="primary"
    @click="handleTransfer"
  >
    Send
  </f-button>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { CreateTransferPayload } from "@foxone/mixin-api/types";

@Component
class TransferAction extends Vue {
  @Prop() disabled!: boolean;

  @Prop() payload;

  loading = false;

  handleTransfer() {
    this.$utils.account.confirmPassword(this, {
      onSuccess: (password: string) => this.requestTransfer(password)
    });
  }

  async requestTransfer(password: string) {
    this.loading = true;

    try {
      const pin = await this.$messages.getEncryptedPin(password);
      const opts: CreateTransferPayload = { ...this.payload, pin };
      const transfer = await this.$endpoints.transfer(opts);

      this.$uikit.toast.success({ message: "Send Successfully" });
      this.handleToSnapshot(transfer);
      this.$utils.asset.updateAsset(this, this.payload.asset_id);

      this.$emit("success");
    } catch (error) {
      this.$utils.helper.errorToast(this, error);
    }

    this.loading = false;
  }

  handleToSnapshot(transfer) {
    this.$router.push({
      name: "snapshot-id",
      params: { id: transfer.snapshot_id }
    });
  }
}
export default TransferAction;
</script>
