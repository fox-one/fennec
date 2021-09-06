<template>
  <div>
    <warning>
      <div>
        This is so important that we thought it's not too much to emphasize once
        again:
        <br />
        <br />
        Please make sure you have saved your keystore files to somewhere safe
        and private. If not, you might lose access to your assets. And there is
        absolutely NO WAY to recover.
      </div>
    </warning>

    <check-box-field :value.sync="checked" class="mt-8">
      <template #label>
        I confirm I’m aware and have kept the keystore files safe
      </template>
    </check-box-field>

    <div class="text-center mt-8">
      <f-button :disabled="!checked" color="primary" @click="handleToHome">
        Next
      </f-button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Mixins } from "vue-property-decorator";
import PageView from "../mixin/page";

@Component
class BackupConfirmPage extends Mixins(PageView) {
  checked = false;

  get title() {
    return "BackUp Confirm";
  }

  get appbar() {
    return {
      back: false
    };
  }

  handleToHome() {
    this.$router.push({ name: "home" });
  }
}
export default BackupConfirmPage;
</script>
