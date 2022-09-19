<template>
  <qr-code-field :text="meta.text">
    <template #foot>
      <v-layout align-center class="mb-4">
        <v-flex class="text mr-4">
          {{ meta.text }}
        </v-flex>

        <copy-field :text="meta.text" />
      </v-layout>

      <v-layout justify-center align-center>
        <span class="mr-3">
          <v-img
            width="36"
            height="36"
            :src="require('../../assets/images/icon-mixin.png')"
          />
        </span>

        <div @click="handleToMixin">
          <div class="label-1">{{ $t("scan.qr") }}</div>
          <div>
            <span class="font-weight-bold">
              {{ $t("mixin.messenger") }}
            </span>
            <v-icon>$FIconUpRight</v-icon>
          </div>
        </div>
      </v-layout>
    </template>
  </qr-code-field>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { Asset } from "@foxone/mixin-api/types";
import { PreferenceStore } from "@foxone/fennec-base/state/types";
import { MIXIN_DOWNLOAD_URL } from "../../defaults";
import QRCodeField from "../common/QRCodeField.vue";

@Component({
  components: {
    "qr-code-field": QRCodeField
  }
})
class TransferQRCode extends Vue {
  @Prop() asset!: Asset;

  get meta() {
    const preference: PreferenceStore = this.$store.state.preference.preference;
    const selectedAccount = preference.selectedAccount ?? "";

    let text = `mixin://transfer/${selectedAccount}`;

    return {
      text
    };
  }

  handleToMixin() {
    window.open(MIXIN_DOWNLOAD_URL);
  }
}
export default TransferQRCode;
</script>

<style lang="scss" scoped>
.text {
  font-weight: bold;
  word-break: break-all;
  text-align: center;
}
</style>
