<template>
  <input-field v-if="show" label="Manage Website Access" class="mb-8">
    <access-manage-item
      v-for="(auth, index) in authes"
      :key="index"
      :auth="auth"
    />
  </input-field>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { AuthUrlInfo } from "@foxone/fennec-base/state/auth";
import AccessManageItem from "./AccessManageItem.vue";

@Component({
  components: {
    AccessManageItem
  }
})
class AccessManage extends Vue {
  loading = false;

  authes: AuthUrlInfo[] = [];

  get show() {
    return this.authes.length > 0;
  }

  mounted() {
    this.requestAuthUrls();
  }

  async requestAuthUrls() {
    this.loading = true;

    try {
      this.authes = await this.$messages.getAuthUrls();
    } catch (error) {
      this.$utils.helper.errorToast(this, error);
    }

    this.loading = false;
  }
}
export default AccessManage;
</script>
