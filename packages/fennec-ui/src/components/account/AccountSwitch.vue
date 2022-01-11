<template>
  <f-bottom-sheet v-model="dialog" wapper-in-desktop="dialog">
    <template #activator="{ on }">
      <slot name="activator" :on="on">
        <account-chip @click.native="on.click" />
      </slot>
    </template>

    <div class="accounts">
      <div class="px-4 py-6">
        <div class="text-1 text-center mb-8">{{ $t("account.my") }}</div>

        <div class="accounts-list">
          <account-overview-list />
        </div>
      </div>
    </div>
  </f-bottom-sheet>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import AccountChip from "./AccountChip.vue";
import AccountOverviewList from "./AccountOverviewList.vue";

@Component({
  components: {
    AccountChip,
    AccountOverviewList
  }
})
class AccountSwitch extends Vue {
  dialog = false;
}
export default AccountSwitch;
</script>

<style lang="scss" scoped>
.accounts-list {
  max-height: 60vh;
  overflow: auto;
}
</style>
