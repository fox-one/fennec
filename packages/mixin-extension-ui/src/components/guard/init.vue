<template>
  <v-container class="mt-10 mb-5">
    <v-window v-model="step" touchless class="text-center">
      <v-window-item :value="0">
        <div class="title font-weight-bold">Welcome</div>
        <div class="subtitle-2 my-5">Here is some image or description</div>
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
      <v-window-item :value="1">
        <div class="title">Import keystore and setup password.</div>
        <init-account-form class="mt-5" @completed="handleCompletedImport" />
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
import { Component, Vue } from "vue-property-decorator";
import BackUpKeyring from "../account/BackUpKeyring.vue";
import DelayAction from "../common/DelayAction.vue";
import InitAccountForm from "../account/InitAccountForm.vue";

@Component({
  components: {
    InitAccountForm,
    BackUpKeyring,
    DelayAction
  }
})
class Init extends Vue {
  step = 0;

  loading = false;

  handleStart() {
    this.step = 1;
  }

  handleCompletedImport() {
    this.step = 2;
  }

  async handleToHome() {
    this.loading = true;
    await this.$utils.app.init(this);
    this.loading = false;
  }
}
export default Init;
</script>
