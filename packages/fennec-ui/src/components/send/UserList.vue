<template>
  <div>
    <div class="label-1 mb-4">Contacts</div>

    <user-item
      v-for="(id, index) in contacts"
      :id="id"
      :key="index"
      @click.native="handleSelect(id)"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import UserItem from "./UserItem.vue";
import { Sync } from "vuex-pathify";

@Component({
  components: {
    UserItem
  }
})
class UserList extends Vue {
  @Sync("page/send@transferForm") form;

  get contacts() {
    return this.$store.state.page.send.contacts;
  }

  handleSelect(id: string) {
    this.form.opponent = id;
    this.$router.back();
  }
}
export default UserList;
</script>
