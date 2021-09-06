<template>
  <div>
    <user-search />

    <user-list />
  </div>
</template>

<script lang="ts">
import { Component, Mixins } from "vue-property-decorator";
import PageView from "../../mixin/page";
import UserSearch from "../../components/send/UserSearch.vue";
import UserList from "../../components/send/UserList.vue";

@Component({
  components: {
    UserSearch,
    UserList
  }
})
class ContactsPage extends Mixins(PageView) {
  get title() {
    return "Select Contacts";
  }
}
export default ContactsPage;
</script>
