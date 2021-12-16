<template>
  <div class="unlock-page">
    <v-img
      width="88"
      height="88"
      class="d-inline-block"
      :src="require('../assets/images/icon-locked.png')"
    />

    <div class="my-8 text-1">
      {{ $t("password.need.unlock") }}
    </div>

    <enter-password-form label="Unlock" />

    <f-button small text class="help" @click="handleToHelp">
      <v-icon size="16">$FIconHelp3PFill</v-icon>
      <span class="ml-2">
        {{ $t("need.help") }}
      </span>
    </f-button>
  </div>
</template>

<script lang="ts">
import { Component, Mixins, Watch } from "vue-property-decorator";
import PageView from "../mixin/page";
import EnterPasswordForm from "../components/account/EnterPasswordForm.vue";

@Component({
  components: {
    EnterPasswordForm
  }
})
class UnlockPage extends Mixins(PageView) {
  isCover = true;

  counter = 3;

  get isUnlocked() {
    return this.$store.state.keyring.keyring.isUnlocked;
  }

  @Watch("isUnlocked", { immediate: true })
  handleLockChange(value) {
    if (value) {
      this.$router.push({ name: "home" });
    }
  }

  handleToHelp() {
    this.$router.push({ name: "help" });
  }
}
export default UnlockPage;
</script>

<style lang="scss" scoped>
.unlock-page {
  width: 260px;
  text-align: center;
  position: relative;
}

.help {
  position: fixed;
  bottom: 32px;
  left: 50%;
  transform: translateX(-50%);

  &:hover {
    ::v-deep {
      .v-btn__content {
        color: var(--v-primary-base);
      }
    }
  }
}
</style>
