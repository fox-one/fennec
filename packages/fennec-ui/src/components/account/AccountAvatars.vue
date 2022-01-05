<template>
  <f-bottom-sheet v-model="dialog" :title="title">
    <template #activator="{ on }">
      <div class="receivers" v-on="on">
        <account-avatar
          v-for="(url, index) in urls"
          :key="index"
          :url="url"
          size="24"
          class="receiver"
        />
      </div>
    </template>

    <v-list-item v-for="(item, index) in users" :key="index">
      <v-list-item-avatar>
        <v-img :src="item && item.avatar_url" />
      </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title> {{ item && item.full_name }} </v-list-item-title>
        <v-list-item-subtitle class="caption">
          {{ item.identity_number }}
        </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
  </f-bottom-sheet>
</template>

<script lang="ts">
import { User } from "@foxone/mixin-api/types";
import { Component, Vue, Prop } from "vue-property-decorator";
import AccountAvatar from "./AccountAvatar.vue";

@Component({
  components: {
    AccountAvatar
  }
})
class AccountAvatars extends Vue {
  @Prop() urls!: string[];

  @Prop() users!: User[];

  @Prop() title!: string;

  dialog = false;
}
export default AccountAvatars;
</script>

<style lang="scss" scoped>
.receivers {
  display: flex;

  .receiver {
    &:first-child {
      margin-left: 0px;
    }

    margin-left: -4px;
  }
}
</style>
