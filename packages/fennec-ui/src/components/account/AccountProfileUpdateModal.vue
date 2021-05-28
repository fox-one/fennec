<template>
  <f-bottom-sheet v-model="dialog">
    <template #activator="{ on }">
      <v-icon size="18" v-on="on">
        {{ $icons.mdiPencilBox }}
      </v-icon>
    </template>
    <template #title> Update Profile </template>
    <v-form class="pa-5 profile-form">
      <image-form-item v-model="form.avatar" label="Avatar" class="mb-5" />
      <f-input v-model="form.name" label="Full Name" />
      <v-btn
        block
        rounded
        depressed
        color="primary"
        class="mt-5"
        :loading="loading"
        @click="handleSubmit"
      >
        Submit
      </v-btn>
    </v-form>
  </f-bottom-sheet>
</template>

<script lang="ts">
import { User } from "@foxone/mixin-api/types";
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import ImageFormItem from "../common/ImageFormItem.vue";

@Component({
  components: {
    ImageFormItem
  }
})
class AccountUpdateModal extends Vue {
  @Prop() user!: User | null;

  dialog = false;

  loading = false;

  form = {
    name: "",
    avatar: ""
  };

  @Watch("user", { immediate: true })
  handleUserChange() {
    if (this.user) {
      this.form.name = this.user?.full_name;
      this.form.avatar = this.user?.avatar_url;
    }
  }

  async handleSubmit() {
    this.loading = true;
    let avatar = this.form.avatar;

    if (avatar.startsWith("data:")) {
      avatar = avatar.replace(/^data:image\/(png|jpg|jpeg|svg);base64,/, "");
    }

    try {
      await this.$endpoints.updateProfile({
        avatar_base64: avatar,
        full_name: this.form.name
      });
      this.$emit("completed");
      this.dialog = false;
    } catch (error) {
      this.$utils.helper.errorToast(this, error);
    }

    this.loading = false;
  }
}
export default AccountUpdateModal;
</script>

<style lang="scss" scoped>
.profile-form {
  ::v-deep {
    .v-image__image {
      border-radius: 100px;
    }
  }
}
</style>
