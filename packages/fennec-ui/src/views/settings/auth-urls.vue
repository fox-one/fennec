<template>
  <v-container>
    <f-loading v-if="loading" fullscreen :loading="loading" />
    <f-panel class="pa-0">
      <div class="f-caption pa-3">Manage Website Access</div>
      <list-warpper :data="authUrls" :loading="loading">
        <auth-url-item
          v-for="(item, index) in authUrls"
          :key="index"
          :auth-url="item"
        />
      </list-warpper>
    </f-panel>
  </v-container>
</template>

<script lang="ts">
import { Component, Mixins } from "vue-property-decorator";
import PageView from "../../mixin/page";
import AuthUrlItem from "../../components/auth/AuthUrlItem.vue";
import { AuthUrlInfo } from "@foxone/fennec-base/state/auth";
import ListWarpper from "../../components/common/ListWarpper.vue";

@Component({ components: { AuthUrlItem, ListWarpper } })
class AuthUrlsPage extends Mixins(PageView) {
  authUrls: AuthUrlInfo[] = [];

  loading = false;

  get title() {
    return "Authorize Urls";
  }

  mounted() {
    this.requestAuthUrls();
  }

  async requestAuthUrls() {
    this.loading = true;

    try {
      this.authUrls = await this.$messages.getAuthUrls();
    } catch (error) {
      this.$utils.helper.errorToast(this, error);
    }

    this.loading = false;
  }
}
export default AuthUrlsPage;
</script>
