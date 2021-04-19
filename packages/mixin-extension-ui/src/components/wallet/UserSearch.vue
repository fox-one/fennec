<template>
  <div class="user-search f-bg-greyscale-6">
    <template v-if="bindUser">
      <v-list-item class="pa-0" @focus="handleFocus">
        <span class="avatar mr-3">
          <v-img width="32" height="32" :src="bindUser.avatar_url" />
        </span>
        <v-list-content>
          <v-list-item-title>
            {{ bindUser.full_name }}
          </v-list-item-title>
          <v-list-item-subtitle class="mt-1">
            {{ bindUser.identity_number }}
          </v-list-item-subtitle>
        </v-list-content>
      </v-list-item>
    </template>
    <template v-else>
      <span>
        <v-icon>
          {{ $icons.mdiHelpCircle }}
        </v-icon>
      </span>
      <v-text-field
        v-model="search"
        solo
        flat
        hide-details
        background-color="transparent"
        label="Search with mixin id or phone number"
        @blur="requestSearchUser"
        @keypress.enter="requestSearchUser"
      />
      <v-spacer />
      <v-btn icon :loading="loading" color="primary" @click="requestSearchUser">
        <v-icon>
          {{ $icons.mdiMagnify }}
        </v-icon>
      </v-btn>
    </template>
  </div>
</template>

<script lang="ts">
import { User } from "@foxone/mixin-sdk/types";
import { Component, PropSync, Vue } from "vue-property-decorator";

@Component
class UserSearch extends Vue {
  @PropSync("user") bindUser!: User | null;

  search = "";

  loading = false;

  handleFocus() {
    this.bindUser = null;
  }

  async requestSearchUser() {
    if (!this.search) {
      return;
    }

    this.loading = true;
    try {
      const res = await this.$endpoints.getUser(this.search);
      this.bindUser = res;
    } catch (error) {
      this.$utils.helper.errorToast(this, {
        ...error,
        description: "User not found"
      });
    }
    this.loading = false;
  }
}
export default UserSearch;
</script>

<style lang="scss" scoped>
.user-search {
  display: flex;
  align-items: center;
  height: 72px;
  border-radius: 5px;
  padding: 8px 16px;

  .avatar {
    border-radius: 16px;
    overflow: hidden;
  }
}
</style>
