<template>
  <f-panel :padding="0" class="mt-4 overflow-hidden">
    <tabs v-model="kind" :tabs="tabs" />

    <div v-if="kind === 0">
      <destination-qr-code :asset="asset" v-bind="$attrs" />
      <f-divider v-if="asset.tag" />
      <tag-qr-code :asset="asset" v-bind="$attrs" />
    </div>

    <div v-if="kind === 1">
      <transfer-qr-code :asset="asset" v-bind="$attrs" />
    </div>
  </f-panel>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import DestinationQRCode from "./DestinationQRCode.vue";
import TransferQRCode from "./TransferQRCode.vue";
import TagQRCode from "./TagQRCode.vue";

@Component({
  components: {
    "destination-qr-code": DestinationQRCode,
    "transfer-qr-code": TransferQRCode,
    "tag-qr-code": TagQRCode
  }
})
class DepositMethodsPopup extends Vue {
  @Prop() asset;

  kind = 0;

  get tabs() {
    return [{ text: "Address" }, { text: "Mixin" }];
  }
}
export default DepositMethodsPopup;
</script>
