<template>
  <f-app-bar flat custom-content height="30" color="transparent" class="pa-0">
    <div class="nav-title">
      <v-avatar size="32" class="mr-2">
        <v-img :src="meta.avatar" />
      </v-avatar>
      <span>{{ meta.name }}</span>
    </div>

    <v-spacer />

    <action-lock />

    <span></span>
  </f-app-bar>
</template>

<script lang="ts">
import { GlobalGetters } from "@foxone/fennec-ui/store/types";
import { User } from "@foxone/mixin-api/types";
import { Component, Vue } from "vue-property-decorator";
import ActionLock from "../../components/account/ActionLock.vue";

@Component({
  components: {
    ActionLock
  }
})
class NavTitle extends Vue {
  get meta() {
    const profile: User | undefined =
      this.$store.getters[GlobalGetters.CURRENT_PROFILE];

    return {
      avatar:
        profile?.avatar_url ||
        require("../../assets/images/default-avatar.png"),
      name: profile?.full_name
    };
  }
}
export default NavTitle;
</script>
