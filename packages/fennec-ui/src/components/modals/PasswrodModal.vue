<template>
  <v-dialog v-model="dialog" max-width="600">
    <template v-if="dialog">
      <v-card v-if="meta.inited" class="pa-3">
        <v-card-title class="justify-center f-title-1">
          Confirm Password
        </v-card-title>
        <v-card-text class="px-0">
          <enter-password-form
            class="mt-3"
            :label="'Submit'"
            @completed="handleCompleted"
            @failed="handleFailed"
          />
        </v-card-text>
      </v-card>

      <v-card v-else class="pa-3">
        <v-card-title class="justify-center f-title-1">
          Create Password
        </v-card-title>
        <v-card-text class="px-0">
          <f-tip type="error" class="mt-5">
            Password is the only way to unlock and backup your wallet, please
            make sure to keep it safe.
          </f-tip>
          <create-password-form
            class="mt-3"
            @completed="handleCompleted"
            @failed="handleFailed"
          />
        </v-card-text>
      </v-card>
    </template>
  </v-dialog>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import EnterPasswordForm from "../account/EnterPasswordForm.vue";
import CreatePasswordForm from "../account/CreatePasswordForm.vue";
import { EVENTS } from "../../defaults";
import { KeyringMemState } from "@foxone/fennec-base/state/keyring";

export interface ConfirmPasswordPayload {
  onSuccess: (password: string) => void;
  onFailed: (error: Error) => void;
}

@Component({
  components: {
    EnterPasswordForm,
    CreatePasswordForm
  }
})
class ConfirmPassowordModal extends Vue {
  dialog = false;

  onSuccess: ((password: string) => void) | null = null;

  onFailed: ((error: Error) => void) | null = null;

  get meta() {
    const keyring: KeyringMemState = this.$store.state.keyring.keyring;
    const inited = keyring.initialized;

    return {
      inited
    };
  }

  mounted() {
    this.$root.$on(
      EVENTS.CONFIRM_PASSWORD,
      (payload: ConfirmPasswordPayload) => {
        this.dialog = true;
        this.onSuccess = payload.onSuccess;
        this.onFailed = payload.onFailed ?? null;
      }
    );
  }

  handleCompleted(password: string) {
    this.dialog = false;

    if (this.onSuccess && typeof this.onSuccess === "function") {
      this.onSuccess(password);
    }
  }
}
export default ConfirmPassowordModal;
</script>
