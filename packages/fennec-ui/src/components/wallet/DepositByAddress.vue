<template>
  <div>
    <div v-if="meta.tag" class="caption text--secondary mt-5">
      Step 1: Copy Address
    </div>
    <div v-if="meta.destination" class="mt-5">
      <div class="f-caption my-3">Address</div>
      <v-layout align-center>
        <v-flex class="destination mr-5 f-body-2 font-weight-bold">
          {{ meta.destination }}
        </v-flex>
        <v-btn
          v-clipboard:copy="meta.destination"
          v-clipboard:success="() => $utils.helper.onCopySuccess(this)"
          v-clipboard:error="() => $utils.helper.onCopyFail(this)"
          small
          depressed
          rounded
          color="primary"
        >
          Copy
        </v-btn>
      </v-layout>
      <div class="mt-5 d-flex justify-center">
        <f-qr-code size="168" :text="meta.destination" />
      </div>
    </div>

    <div v-if="meta.tag" class="caption text--secondary mt-10">
      Step 2: Copy Memo
    </div>
    <div v-if="meta.tag" class="mt-5">
      <div class="f-caption my-3">Memo</div>
      <v-layout>
        <v-flex class="tag mr-5 f-body-2 font-weight-bold">
          {{ meta.tag }}
        </v-flex>
        <v-btn
          v-clipboard:copy="meta.tag"
          v-clipboard:success="() => $utils.helper.onCopySuccess(this)"
          v-clipboard:error="() => $utils.helper.onCopyFail(this)"
          small
          depressed
          rounded
          color="primary"
        >
          Copy
        </v-btn>
      </v-layout>
      <div class="mt-5 d-flex justify-center">
        <f-qr-code size="168" :text="meta.tag" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { Asset } from "@foxone/mixin-api/types";

@Component
class DepositByAddress extends Vue {
  @Prop() asset!: Asset | null;

  get meta() {
    return {
      destination: this.asset?.destination ?? "",
      tag: this.asset?.tag ?? "",
      symbol: this.asset?.symbol ?? "",
      confirmations: this.asset?.destination ?? ""
    };
  }
}
export default DepositByAddress;
</script>

<style lang="scss" scoped>
.destination {
  font-size: 16px;
  line-height: 1.2;
  word-break: break-all;
}

.tag,
.destination {
  word-break: break-all;
}
</style>
