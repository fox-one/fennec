<template>
  <div>
    <template v-for="(item, index) in items">
      <side-nav-item-account
        v-if="item.type === 'account'"
        :key="index"
        :item="item"
      />
      <side-nav-item-route v-else :key="index" :item="item" />
    </template>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import SideNavItemAccount from "./SideNavItemAccount.vue";
import SideNavItemRoute from "./SideNavItemRoute.vue";

@Component({
  components: {
    SideNavItemAccount,
    SideNavItemRoute
  }
})
class SideNavItems extends Vue {
  get items() {
    const unlocked = this.$store.state.keyring.keyring.isUnlocked;
    const profiles = this.$store.state.keyring.profiles;
    const isBackup = ["backup", "backup-confirm"].includes(
      this.$route.name as string
    );

    let items = [
      {
        icon: "$IconAddBold",
        text: "Create Account",
        path: "account-create"
      },
      {
        icon: "$FIconImport4PBold",
        text: "Import Account",
        path: "account-import"
      }
    ];

    if (!isBackup && unlocked) {
      items = [
        ...items,
        {
          icon: "$FIconSetting4PFill",
          text: "Setting",
          path: "setting"
        }
      ];
    }

    if (!isBackup && profiles.length > 0) {
      const profileItems = profiles.map((x) => {
        return {
          type: "account",
          profile: x
        };
      });

      items = [...profileItems, ...items];
    }

    return items;
  }
}
export default SideNavItems;
</script>
