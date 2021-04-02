<template>
  <f-bottom-sheet v-model="dialog">
    <template #activator="{ on }">
      <div class="receivers" v-on="on">
        <account-avatar
          v-for="(url, index) in urls"
          :key="index"
          :url="url"
          size="32"
          class="receiver"
        />
      </div>
    </template>
    <template #title>
      <slot name="title" />
    </template>
    <v-list-item v-for="(item, index) in users" :key="index">
      <v-list-item-avatar>
        <v-img :src="item.avatar_url" />
      </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title> {{ item.full_name }} </v-list-item-title>
        <v-list-item-subtitle class="caption">
          {{ item.identity_number }}
        </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
  </f-bottom-sheet>
</template>

<script lang="ts">
import { User } from "@foxone/mixin-sdk/types";
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

    margin-left: -10px;
  }
}
</style>
