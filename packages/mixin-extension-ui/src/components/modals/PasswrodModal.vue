<template>
  <v-dialog v-model="dialog">
    <template v-if="dialog">
      <v-card v-if="meta.inited">
        <v-card-title class="justify-center f-title-1">
          Confirm Password
        </v-card-title>
        <v-card-text>
          <enter-password-form
            class="mt-3"
            :label="'Submit'"
            @completed="handleCompleted"
            @failed="handleFailed"
          />
        </v-card-text>
      </v-card>

      <v-card v-else>
        <v-card-title class="justify-center f-title-1">
          Create Password
        </v-card-title>
        <v-card-text>
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
import { KeyringMemState } from "@foxone/mixin-extension-base/state/keyring";

export interface ConfirmPasswordPayload {
  onSuccess: Function;
  onFailed: Function;
}

@Component({
  components: {
    EnterPasswordForm,
    CreatePasswordForm
  }
})
class ConfirmPassowordModal extends Vue {
  dialog = false;

  onSuccess: Function | null = null;

  onFailed: Function | null = null;

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
