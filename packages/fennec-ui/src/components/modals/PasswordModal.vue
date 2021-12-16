<template>
  <f-bottom-sheet
    v-model="dialog"
    wapper-in-desktop="dialog"
    :hide-close-icon="!meta.inited"
    :dialog-props="{ maxWidth: 380 }"
    max-width="380"
  >
    <div v-if="dialog">
      <v-card v-if="meta.inited" flat class="pb-0 pt-5 px-4" :class="classes">
        <v-card-title class="justify-center mb-8 pa-0">
          {{ $t("password.confirm") }}
        </v-card-title>
        <v-card-text class="pa-0">
          <enter-password-form
            :label="'Submit'"
            @completed="handleCompleted"
            @failed="handleFailed"
            @cancel="handleCanceled"
          />
        </v-card-text>
      </v-card>

      <v-card v-else flat class="pb-0 px-4" :class="classes">
        <warning :text="$t('password.warning')" class="password-warning" />
        <v-card-title class="justify-center mb-8 pa-0">
          {{ $t("password.create") }}
        </v-card-title>
        <v-card-text class="pa-0">
          <create-password-form
            @completed="handleCompleted"
            @failed="handleFailed"
            @cancel="handleCanceled"
          />
        </v-card-text>
      </v-card>
    </div>
  </f-bottom-sheet>
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

  onFailed: ((...args: any) => void) | null = null;

  get meta() {
    const keyring: KeyringMemState = this.$store.state.keyring.keyring;
    const inited = keyring.initialized;

    return {
      inited
    };
  }

  get classes() {
    const smAndDown = this.$vuetify.breakpoint.smAndDown;

    return { "password-modal": true, "password-modal--popup": smAndDown };
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

  handleFailed() {
    this.dialog = false;

    if (this.onFailed && typeof this.onFailed === "function") {
      this.onFailed();
    }
  }

  handleCanceled() {
    this.dialog = false;
  }
}
export default ConfirmPassowordModal;
</script>

<style lang="scss" scoped>
.v-alert {
  position: absolute;
  top: 0px;
  left: 0px;
  border-bottom-left-radius: 0 !important;
  border-bottom-right-radius: 0 !important;
}

.password-modal {
  overflow: hidden;
  padding-top: 100px;
}
</style>
