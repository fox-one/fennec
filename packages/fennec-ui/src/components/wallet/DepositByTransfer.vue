<template>
  <div class="mt-10">
    <v-layout class="justify-center">
      <f-qr-code :text="meta.qr" size="168" />
    </v-layout>

    <div class="d-flex justify-center f-caption my-3">
      Scan QRCode with
      <a :href="MIXIN_DOWNLOAD_URL" target="_blank" class="mx-1">
        Mixin Messenger
      </a>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { Asset } from "@foxone/mixin-api/types";
import { PreferenceStore } from "@foxone/fennec-base/state/types";
import AssetQRCode from "./AssetQRCode.vue";
import { MIXIN_DOWNLOAD_URL } from "../../defaults";

// const externals = [
//   {
//     id: "43d61dcd-e413-450d-80b8-101d5e903357",
//     prefix: "ethereum"
//   },
//   {
//     id: "c6d0c728-2624-429b-8e0d-d9d19b6592fa",
//     prefix: "bitcoin"
//   }
// ];

@Component({
  components: {
    "asset-qr-code": AssetQRCode
  }
})
class DepositByTransfer extends Vue {
  @Prop() asset!: Asset;

  MIXIN_DOWNLOAD_URL = MIXIN_DOWNLOAD_URL;

  get meta() {
    // const asset = this.asset;
    const preference: PreferenceStore = this.$store.state.preference.preference;
    const selectedAccount = preference.seletedAccount ?? "";

    let qr = `mixin://transfer/${selectedAccount}`;
    let isExternal = false;

    return {
      qr,
      isExternal
    };
  }
}
export default DepositByTransfer;
</script>
