<template>
  <v-container>
    <f-loading :loading="loading" fullscreen />
    <div class="text-center content">
      <div class="f-headline pt-10">Unlock your accounts</div>
      <div class="lock-icon-wrapper">
        <img src="../../assets/images/password.svg" />
      </div>
      <enter-password-form @completed="handlePasswordEntered" />
    </div>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import EnterPasswordForm from "../account/EnterPasswordForm.vue";

@Component({
  components: {
    EnterPasswordForm
  }
})
class UnLockPage extends Vue {
  loading = false;

  counter = 3;

  get title() {
    return "unlock";
  }

  get appbar() {
    return {
      show: false
    };
  }

  handlePasswordEntered() {
    this.checkUnlockStatus();
  }

  checkUnlockStatus() {
    this.counter -= 1;
    debugger;
    const isUnlocked = this.$store.state.keyring.keyring.isUnlocked;
    if (isUnlocked) {
      this.confirmUnlocked();
    } else {
      if (this.counter === 0) {
        this.$utils.helper.errorToast(this, {
          message: "Unable to check unlocked status"
        });
      } else {
        setTimeout(() => {
          this.checkUnlockStatus();
        }, 1000);
      }
    }
  }

  confirmUnlocked() {
    this.$utils.app.init(this);
  }
}
export default UnLockPage;
</script>

<style lang="scss" scoped>
.content {
  margin-top: 44px;
}

.lock-icon-wrapper {
  margin-top: 40px;
  margin-bottom: 30px;
}
</style>
