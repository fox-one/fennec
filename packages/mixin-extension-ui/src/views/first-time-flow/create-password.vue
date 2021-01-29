<template>
  <v-container class="create-password-page">
    <div class="title font-weight-bold">Welcome to Mixin Extension Wallet</div>
    <v-window v-model="step" touchless>
      <v-window-item :value="0">
        <div class="text--secondary body-2">
          <span class="font-weight-bold">Step 1:</span>
          Setup a password for account management.
        </div>
        <create-password-form
          class="mt-5"
          @completed="handleCompleteInitialized"
        />
      </v-window-item>
      <v-window-item :value="1">
        <div class="text--secondary body-2">
          <span class="font-weight-bold">Step 2:</span>
          Import your Mixin cccount session.
        </div>
        <import-mixin-account-session-form
          class="mt-5"
          @completed="handleCompletedImport"
        />
      </v-window-item>
    </v-window>
  </v-container>
</template>

<script lang="ts">
import { Component, Mixins } from "vue-property-decorator";
import PageView from "../../mixin/page";
import CreatePasswordForm from "../../components/account/CreatePasswordForm.vue";
import ImportMixinAccountSessionForm from "../../components/account/ImportMixinAccountSessionForm.vue";

@Component({
  components: {
    CreatePasswordForm,
    ImportMixinAccountSessionForm
  }
})
class WelcomePage extends Mixins(PageView) {
  step = 0;

  get title() {
    return "Create Password";
  }

  get appbar() {
    return {
      show: false
    };
  }

  handleCompleteInitialized() {
    this.step = 1;
  }

  handleCompletedImport() {}
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
