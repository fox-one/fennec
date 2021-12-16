<template>
  <v-form v-model="valid">
    <input-field :label="$t('address.note')" :hint="$t('address.note.hint')">
      <f-input
        v-model="form.label"
        :placeholder="$t('address.note.placeholder')"
      />
    </input-field>

    <input-field
      :label="$t('address')"
      :hint="$t('address.hint', { symbol: meta.symbol })"
    >
      <v-textarea
        v-model="form.destination"
        filled
        :placeholder="$t('address.placeholder')"
      />
    </input-field>

    <div>
      <f-divider />
      <v-layout
        align-center
        class="hint mt-4 mb-4"
        :class="{ 'address--expand': expand }"
        @click="handleToggleTag"
      >
        <v-flex>
          {{ $t("address.use.memo") }}
        </v-flex>
        <span class="icon">
          <v-btn icon small>
            <v-icon>$FIconChevronDown</v-icon>
          </v-btn>
        </span>
      </v-layout>

      <v-expand-transition>
        <input-field v-if="expand" :label="$t('memo')" :hint="$t('memo.hint')">
          <v-textarea
            v-model="form.tag"
            filled
            :placeholder="$t('memo.placeholder')"
          />
        </input-field>
      </v-expand-transition>

      <f-divider />
    </div>

    <div class="text-center mt-8">
      <f-button
        :loading="saving"
        :disabed="!valid"
        color="primary"
        @click="handleSave"
      >
        {{ $t("save") }}
      </f-button>
    </div>
  </v-form>
</template>

<script lang="ts">
import { Asset, Address } from "@foxone/mixin-api/types";
import { Component, Vue, Prop } from "vue-property-decorator";

@Component
class AddressForm extends Vue {
  @Prop() asset!: Asset | null;

  @Prop() address!: Address | null;

  expand = false;

  saving = false;

  valid = false;

  form = {
    label: "",
    tag: "",
    destination: ""
  };

  get meta() {
    return {
      symbol: this.asset?.symbol ?? ""
    };
  }

  get rules() {
    return {
      label: [(v) => !!v || this.$t("message.label.required")],
      destination: [(v) => !!v || this.$t("message.address.required")]
    };
  }

  mounted() {
    if (this.address) {
      this.form.label = this.address.label;
      this.form.tag = this.address.tag;
      this.form.destination = this.address.destination;

      if (this.form.tag) {
        this.expand = true;
      }
    }
  }

  handleSave() {
    if (this.valid) {
      this.$utils.account.confirmPassword(this, {
        onSuccess: (password: string) => this.requestSaveAddress(password)
      });
    }
  }

  handleToggleTag() {
    this.expand = !this.expand;

    if (!this.expand) {
      this.form.tag = "";
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
      this.$uikit.toast.success({
        message: this.$t("message.saved.successfully") as string
      });
      this.$router.back();
    } catch (error) {
      this.$utils.helper.errorToast(this, error);
    }

    this.saving = false;
  }
}
export default AddressForm;
</script>

<style lang="scss" scoped>
.hint {
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
}

.address--expand {
  .icon {
    transform: rotate(180deg);
    transition: transform 0.5s ease;
  }
}
</style>
