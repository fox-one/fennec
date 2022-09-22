<template>
  <f-tip
    v-if="meta.authError"
    :closeable="false"
    type="error"
    class="auth-error mt-8"
  >
    <p>
      {{ $t("auth.error.1") }}
    </p>

    <p class="ma-0">
      {{ $t("auth.error.2") }}
      <span class="action" @click="handleToSetting">
        {{ $t("account.setting") }}
      </span>
    </p>
  </f-tip>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
class AuthErrorWarn extends Vue {
  get meta() {
    return {
      authError: this.$store.state.wallet.authError
    };
  }

  handleToSetting() {
    this.$router.push({ name: "account-overview" });
  }
}
export default AuthErrorWarn;
</script>

<style lang="scss" scoped>
.auth-error {
  font-size: 13px;
  line-height: 24px;

  .action {
    text-decoration: underline;
    cursor: pointer;
  }
}
</style>
