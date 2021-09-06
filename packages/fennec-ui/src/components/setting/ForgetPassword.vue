<template>
  <input-field
    label="Forgot password?"
    hint="If you has backed keystores, you could reset application and then import these keystore file"
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
          <span>Reset Application</span>
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
