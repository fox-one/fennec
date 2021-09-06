<template>
  <f-app-bar flat custom-content app color="bg" class="pa-0">
    <v-layout>
      <action-lock />

      <v-flex class="text-center">
        <top-nav-account />
      </v-flex>

      <action-maximize />
    </v-layout>
  </f-app-bar>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import ActionMaximize from "../../components/common/ActionMaximize.vue";
import ActionLock from "../../components/account/ActionLock.vue";
import TopNavAccount from "./TopNavAccount.vue";

@Component({
  components: {
    ActionLock,
    TopNavAccount,
    ActionMaximize
  }
})
class TopNavHome extends Vue {}
export default TopNavHome;
</script>
