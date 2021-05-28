<template>
  <f-panel class="text-center">
    <div>
      <img src="../../assets/images/lock.svg" />
      <p class="f-body-2 mt-10">Fennec is a wallet of Mixin Network.</p>
      <p class="f-body-2">
        Please create a Mixin Network Account with one of following ways
      </p>
      <slot />
    </div>
  </f-panel>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
class AccountImport extends Vue {}
export default AccountImport;
</script>
