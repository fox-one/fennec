<template>
  <f-bottom-sheet v-model="dialog" wapper-in-desktop="dialog">
    <template #activator="{ on }">
      <account-chip @click.native="on.click" />
    </template>

    <account-overview-list />
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
class AccountSwitch extends Vue {}
export default AccountSwitch;
</script>
