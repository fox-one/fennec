<template>
  <div class="bg_card text-left rounded pa-4 mb-4">
    <v-layout>
      <v-layout align-center class="text-1">
        <v-avatar v-if="icon" size="24" class="mr-4">
          <v-img :src="icon" />
        </v-avatar>
        <span>{{ meta.title }}</span>
      </v-layout>

      <f-switch v-model="value" hide-details @change="handleAccessChange" />
    </v-layout>
    <div class="label-1 mt-3">{{ meta.url }}</div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { AuthUrlInfo } from "@foxone/fennec-base/state/auth";

@Component
class AccessManageItem extends Vue {
  @Prop() auth!: AuthUrlInfo;

  loading = false;

  value = false;

  icon = "";

  get meta() {
    return {
      title: this.auth.origin,
      url: this.auth.id,
      isAllowed: this.auth.isAllowed
    };
  }

  async mounted() {
    this.value = this.meta.isAllowed;

    try {
      this.icon = await this.$utils.helper.getLinkIcon(this.meta.url);
    } catch (error) {
      console.log(error);
    }
  }

  async handleAccessChange(value) {
    this.loading = true;

    const isAllowed = Boolean(value);
    const data = { ...this.auth, isAllowed };
    const id = this.auth.id;

    try {
      await this.$messages.updateAuthUrl(id, data);
    } catch (error) {
      this.$utils.helper.errorToast(this, error);
    }

    this.loading = false;
  }
}
export default AccessManageItem;
</script>
