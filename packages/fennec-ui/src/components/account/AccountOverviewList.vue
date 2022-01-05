<template>
  <div>
    <account-overview-item
      v-for="(item, index) in items"
      :key="index"
      :profile="item"
      :can-edit="canEdit"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import AccountOverviewItem from "./AccountOverviewItem.vue";

@Component({
  components: {
    AccountOverviewItem
  }
})
class AccountOverviewList extends Vue {
  @Prop({ default: false, type: Boolean }) canEdit;

  get items() {
    const profiles = this.$store.state.keyring.profiles;

    return profiles;
  }
}
export default AccountOverviewList;
</script>
