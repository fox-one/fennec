<template>
  <f-panel class="text-center">
    <div>
      <img src="../../assets/images/lock.svg" />
      <p class="f-body-2 mt-10">
        {{ $t("account.import.title") }}
      </p>
      <p class="f-body-2">
        {{ $t("account.import.subtitle") }}
      </p>
      <slot />
    </div>
  </f-panel>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
class AccountImportLogo extends Vue {}
export default AccountImportLogo;
</script>
