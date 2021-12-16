<template>
  <div>
    <warning>
      <div>
        {{ $t("back.warn1") }}
        <br />
        <br />
        {{ $t("back.warn2") }}
        <br />
        <br />
        {{ $t("back.warn3") }}
      </div>
    </warning>

    <account-backup-list class="mt-8" />

    <div class="text-center mt-8">
      <action-backup-all-keystore />

      <f-button text class="mt-4" @click="handleBackUpConfirm">
        {{ $t("i.have.backup") }}
      </f-button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Mixins } from "vue-property-decorator";
import PageView from "../mixin/page";
import ActionBackupAllKeystore from "../components/account/ActionBackupAllKeystore.vue";
import AccountBackupList from "../components/account/AccountBackupList.vue";

@Component({
  components: {
    AccountBackupList,
    ActionBackupAllKeystore
  }
})
class BackUpPage extends Mixins(PageView) {
  get title() {
    return this.$t("backup");
  }

  get appbar() {
    return {
      back: false
    };
  }

  handleBackUpConfirm() {
    this.$router.push({ name: "backup-confirm" });
  }
}
export default BackUpPage;
</script>

<style lang="scss" scoped></style>
