<template>
  <input-field
    :label="$t('password.forgot')"
    :hint="$t('password.forgot.hint')"
    class="mt-8"
  >
    <action-reset-application>
      <template #activator="{ on, loading }">
        <action-field
          :loading="loading"
          icon="$FIconRestore"
          class="error"
          @click.native="on.click"
        >
          <span>
            {{ $t("reset.application") }}
          </span>
        </action-field>
      </template>
    </action-reset-application>
  </input-field>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import ActionResetApplication from "../account/ActionResetApplication.vue";

@Component({
  components: {
    ActionResetApplication
  }
})
class ForgetPassword extends Vue {}
export default ForgetPassword;
</script>
