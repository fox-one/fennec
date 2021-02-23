<template>
  <div>
    <div class="mb-5 text-center">
      <f-mixin-asset-logo
        :size="64"
        :logo="meta.logo"
        :chain-logo="meta.chainLogo"
      />
    </div>
    <v-form ref="form">
      <f-input
        v-model="form.label"
        auto-grow
        persistent-hint
        rows="1"
        class="mb-4"
        label="Label, (e.g. exchanges, wallets, etc.)"
        hint="Assign this address with a easy to recognize name"
        :rules="rules.label"
      />
      <f-input
        v-model="form.destination"
        auto-grow
        persistent-hint
        rows="1"
        label="Address"
        :hint="`The address to withdraw ${meta.symbol}.`"
        class="mb-4"
        :rules="rules.destination"
      />
      <f-input
        v-if="hasMemo"
        v-model="form.tag"
        auto-grow
        persistent-hint
        rows="1"
        class="mb-4"
        hint="Destination Tag or ID Number or notes"
        label="Memo"
        :rules="rules.tag"
      />
      <div v-if="!hasMemo" class="caption secondary--text mt-5">
        {{ `If you need Destination Tag or ID Number or notes, you can` }}
        <a @click="toggleMemo">
          {{ `Add Memo` }}
        </a>
      </div>
      <div v-else class="caption secondary--text">
        {{
          `If you need not Destination Tag or ID Number or notes, you can set it`
        }}
        <a @click="toggleMemo">
          {{ `No Memo` }}
        </a>
      </div>
      <v-btn
        block
        rounded
        depressed
        color="primary"
        class="text-capitalize mt-5"
        @click="handleSaveAddress"
      >
        Save
      </v-btn>
    </v-form>
  </div>
</template>

<script lang="ts">
import { Address, Asset } from "@foxone/mixin-sdk/types";
import { Component, Prop, Vue } from "vue-property-decorator";
import { EVENTS } from "../../defaults";

@Component
class AddressForm extends Vue {
  @Prop() asset!: Asset | null;

  @Prop() address!: Address;

  saving = false;

  form = {
    label: "",
    tag: "",
    destination: ""
  };

  hasMemo = false;

  get meta() {
    return {
      logo: this.asset?.icon_url ?? "",
      chainLogo: this.$utils.helper.getChainAssetLogo(
        this,
        this.asset?.chain_id ?? ""
      ),
      symbol: this.asset?.symbol ?? ""
    };
  }

  get rules() {
    return {
      label: [(v) => !!v || "Label is required"],
      tag: [(v) => !!v || "Tag is required"],
      destination: [(v) => !!v || "Destination is required"]
    };
  }

  toggleMemo() {
    this.hasMemo = !this.hasMemo;
  }

  handleSaveAddress() {
    const form: any = this.$refs.form;
    const valid = form.validate();
    if (valid) {
      this.$root.$emit(EVENTS.CONFIRM_PASSWORD, {
        onSuccess: (password: string) => this.requestSaveAddress(password)
      });
    }
  }

  async requestSaveAddress(password: string) {
    this.saving = true;
    try {
      const pin = await this.$messages.getEncryptedPin(password);
      await this.$endpoints.createWithdrawAddress({
        destination: this.form.destination,
        tag: this.form.tag,
        label: this.form.label,
        asset_id: this.asset?.asset_id ?? "",
        pin
      });
    } catch (error) {
      this.$utils.helper.errorToast(this, error);
    }
  }
}
export default AddressForm;
</script>
