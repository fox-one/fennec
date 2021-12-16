<template>
  <qr-code-field :text="text">
    <template v-if="tag" #title>
      {{ $t("deposit.step1.title") }}
    </template>
    <template #foot>
      <v-layout align-center>
        <v-flex class="text mr-4">
          {{ text }}
        </v-flex>

        <copy-field :text="text" />
      </v-layout>
    </template>
  </qr-code-field>
</template>

<script lang="ts">
import { Asset } from "@foxone/mixin-api/types";
import { Component, Vue, Prop } from "vue-property-decorator";
import QRCodeField from "../common/QRCodeField.vue";

@Component({
  components: {
    "qr-code-field": QRCodeField
  }
})
class AddressQRCode extends Vue {
  @Prop() asset!: Asset;

  get text() {
    return this.asset.destination;
  }

  get tag() {
    return this.asset.tag;
  }
}
export default AddressQRCode;
</script>

<style lang="scss" scoped>
.text {
  font-weight: bold;
  word-break: break-all;
}
</style>
