<template>
  <v-dialog v-model="dialog">
    <v-card v-if="dialog">
      <v-card-title class="justify-center f-title-1">
        Confirm Password
      </v-card-title>
      <v-card-text>
        <enter-password-form
          :label="'Submit'"
          @completed="handleCompleted"
          @failed="handleFailed"
          class="mt-3"
        />
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import EnterPasswordForm from "../account/EnterPasswordForm.vue";
import { EVENTS } from "../../defaults";

export interface ConfirmPasswordPayload {
  onSuccess: Function;
  onFailed: Function;
}

@Component({
  components: {
    EnterPasswordForm
  }
})
class ConfirmPassowordModal extends Vue {
  dialog = false;

  onSuccess: Function | null = null;

  onFailed: Function | null = null;

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
