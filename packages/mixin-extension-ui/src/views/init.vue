<template>
  <v-container class="create-password-page">
    <v-window v-model="step" touchless class="text-center">
      <v-window-item :value="-1">
        <div class="title font-weight-bold">
          Welcome to Mixin Extension Wallet
        </div>
        <div class="subtitle-2">Here is some image or description</div>
        <v-btn
          rounded
          depressed
          min-width="200"
          color="primary"
          class="my-5"
          @click="handleStart"
        >
          Start
        </v-btn>
      </v-window-item>
      <v-window-item :value="0">
        <div class="subtitle-2">
          <span class="font-weight-bold">Step 1:</span>
          Setup a password for account management.
        </div>
        <create-password-form
          class="mt-5"
          @completed="handleCompleteInitialized"
        />
      </v-window-item>
      <v-window-item :value="1">
        <div class="subtitle-2">
          <span class="font-weight-bold">Step 2:</span>
          Import your Mixin cccount session.
        </div>
        <create-account-form class="mt-5" @completed="handleCompletedImport" />
      </v-window-item>
      <v-window-item :value="2">
        <div class="subtitle-2">
          <span class="font-weight-bold">Step 3:</span>
          Back up your Mixin cccount session.
        </div>
        <f-tip type="warning" class="my-3">
          Account session is only way to access your asset, Keep it safe and
          don't share it with anyone.
        </f-tip>
        <back-up-keyring />
        <delay-action
          rounded
          depressed
          min-width="120"
          label="Next"
          color="primary"
          class="my-5"
          :delay="5"
          :loading="loading"
          @click="handleToHome"
        />
      </v-window-item>
    </v-window>
  </v-container>
</template>

<script lang="ts">
import { Component, Mixins } from "vue-property-decorator";
import PageView from "../mixin/page";
import CreatePasswordForm from "../components/account/CreatePasswordForm.vue";
import CreateAccountForm from "../components/account/CreateAccountForm.vue";
import BackUpKeyring from "../components/account/BackUpKeyring.vue";
import DelayAction from "../components/common/DelayAction.vue";

@Component({
  components: {
    CreatePasswordForm,
    CreateAccountForm,
    BackUpKeyring,
    DelayAction
  }
})
class WelcomePage extends Mixins(PageView) {
  step = -1;

  loading = false;

  get title() {
    return "Create Password";
  }

  get appbar() {
    return {
      show: true
    };
  }

  handleStart() {
    this.step = 0;
  }

  handleCompleteInitialized() {
    this.step = 1;
  }

  handleCompletedImport() {
    this.step = 2;
  }

  async handleToHome() {
    this.loading = true;
    await this.$utils.app.init(this);
    this.$router.push({ name: "home" });
    this.loading = false;
  }
}
export default WelcomePage;
</script>

<style lang="scss" scoped>
.create-password-page {
  .title {
    margin-bottom: 30px;
    margin-top: 100px;
  }
}
</style>
