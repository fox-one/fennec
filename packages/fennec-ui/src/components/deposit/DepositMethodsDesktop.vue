<template>
  <div class="mt-8">
    <div class="label-1">
      {{ $t("address") }}
    </div>
    <v-row class="ma-0">
      <v-col cols="6" class="pl-0">
        <destination-qr-code v-bind="$attrs" />
      </v-col>
      <v-col cols="6" class="pr-0">
        <tag-qr-code v-bind="$attrs" />
      </v-col>
    </v-row>
    <div class="label-1 mt-8">Mixin</div>
    <v-row class="ma-0">
      <v-col cols="6" class="pl-0">
        <transfer-qr-code v-bind="$attrs" />
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import DestinationQRCode from "./DestinationQRCode.vue";
import TransferQRCode from "./TransferQRCode.vue";
import TagQRCode from "./TagQRCode.vue";

@Component({
  inheritAttrs: false,
  components: {
    "destination-qr-code": DestinationQRCode,
    "transfer-qr-code": TransferQRCode,
    "tag-qr-code": TagQRCode
  }
})
class DepositMethodsDesktop extends Vue {}
export default DepositMethodsDesktop;
</script>
