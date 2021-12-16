<template>
  <div>
    <warning>
      <div>
        {{ $t("back.confirm.warn1") }}
        <br />
        <br />
        {{ $t("back.confirm.warn2") }}
      </div>
    </warning>

    <check-box-field :value.sync="checked" class="mt-8">
      <template #label>
        {{ $t("back.confirm.safe") }}
      </template>
    </check-box-field>

    <div class="text-center mt-8">
      <f-button :disabled="!checked" color="primary" @click="handleToHome">
        {{ $t("next") }}
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
    return this.$t("backup.confirm");
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
