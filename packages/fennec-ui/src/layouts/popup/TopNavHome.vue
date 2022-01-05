<template>
  <f-app-bar flat custom-content app color="bg" class="pa-0">
    <v-layout>
      <action-lock />

      <v-flex class="text-center">
        <account-chip @click.native="handleClick" />
      </v-flex>

      <action-maximize />
    </v-layout>
  </f-app-bar>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import ActionMaximize from "../../components/common/ActionMaximize.vue";
import ActionLock from "../../components/account/ActionLock.vue";
import AccountChip from "../../components/account/AccountChip.vue";

@Component({
  components: {
    ActionLock,
    AccountChip,
    ActionMaximize
  }
})
class TopNavHome extends Vue {
  handleClick() {
    this.$router.push({ name: "account-overview" });
  }
}
export default TopNavHome;
</script>
