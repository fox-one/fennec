<template>
  <div>
    <warning>
      <div>
        Keystore file is the <span class="font-weight-bold">ONLY</span> way to
        access your assets in Mixin Network.
        <br />
        <br />
        Please backup your keystore file and keep it safe.If you lost it, you
        won't be able to log back into your wallet once you log out. There is NO
        means to recover it.
        <br />
        <br />
        If someone else has your keystore file, they will be able to access your
        wallet. Your assets will be subjected to risks of being stolen.
      </div>
    </warning>

    <account-backup-list class="mt-8" />

    <div class="text-center mt-8">
      <action-backup-all-keystore />

      <f-button text class="mt-4" @click="handleBackUpConfirm">
        I have backuped
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
    return "BackUp";
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
