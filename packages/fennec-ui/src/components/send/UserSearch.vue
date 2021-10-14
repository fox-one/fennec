<template>
  <div>
    <f-input
      v-model="search"
      clearable
      placeholder="Search with Mixin ID"
      @blur="requestSearchUser"
      @keypress.enter="requestSearchUser"
    >
      <template #prepend-inner>
        <v-icon>$FIconSearch</v-icon>
      </template>
    </f-input>

    <user-item
      v-if="user"
      :id="id"
      :clearable="false"
      @click.native="handleSelect"
    />
  </div>
</template>

<script lang="ts">
import { User } from "@foxone/mixin-api/types";
import { Component, Vue } from "vue-property-decorator";
import UserItem from "./UserItem.vue";
import { Sync } from "vuex-pathify";

@Component({
  components: {
    UserItem
  }
})
class UserSearch extends Vue {
  @Sync("page/send@transferForm") form;

  search = "";

  user: User | null = null;

  get id() {
    return this.user?.user_id ?? "";
  }

  handleSelect() {
    this.form.opponent = this.user?.user_id ?? "";
    this.$router.back();
  }

  async requestSearchUser() {
    try {
      this.user = await this.$endpoints.getUser(this.search);
    } catch (error) {
      this.user = null;
    }
  }
}
export default UserSearch;
</script>
