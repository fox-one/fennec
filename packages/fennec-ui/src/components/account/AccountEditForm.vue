<template>
  <v-form>
    <v-layout>
      <v-flex>
        <div class="label-1">Mixin ID</div>
        <div class="text-2">{{ meta.mixinId }}</div>
      </v-flex>

      <image-form-item v-model="form.avatar" />
    </v-layout>

    <input-field label="Wallet Name" class="mt-8">
      <f-input v-model="form.name" placeholder="Input..." />
    </input-field>

    <div class="label-1 mb-3">More</div>

    <action-back-up-keystore :id="meta.id">
      <template #activator="{ on, loading }">
        <action-field
          :loading="loading"
          icon="$FIconFile"
          class="mb-3"
          @click.native="on.click"
        >
          <span>Backup</span>
        </action-field>
      </template>
    </action-back-up-keystore>

    <action-remove-keystore :id="meta.id" @completed="handleRemoved">
      <template #activator="{ on, loading }">
        <action-field
          :loading="loading"
          icon="$IconRemove"
          class="error"
          @click.native="on.click"
        >
          <span>Remove Account</span>
        </action-field>
      </template>
    </action-remove-keystore>

    <div class="text-center mt-8">
      <f-button :loading="loading" color="primary" @click="handleSubmit">
        Save
      </f-button>
    </div>
  </v-form>
</template>

<script lang="ts">
import { User } from "@foxone/mixin-api/types";
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import ActionBackUpKeystore from "./ActionBackupKeystore.vue";
import ActionRemoveKeystore from "./ActionRemoveKeystore.vue";

@Component({
  components: {
    ActionBackUpKeystore,
    ActionRemoveKeystore
  }
})
class AccountEditForm extends Vue {
  @Prop() profile!: User;

  loading = false;

  form = {
    name: "",
    avatar: ""
  };

  get meta() {
    const profile = this.profile;

    return { mixinId: profile.identity_number, id: profile.user_id };
  }

  @Watch("user", { immediate: true })
  handleUserChange() {
    if (this.profile) {
      this.form.name = this.profile?.full_name;
      this.form.avatar = this.profile?.avatar_url;
    }
  }

  handleRemoved() {
    this.$router.push({ name: "home" });
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

      this.$uikit.toast.success({ message: "Updated Successfully" });
      this.$utils.account.loadAccounts(this);
    } catch (error) {
      this.$utils.helper.errorToast(this, error);
    }

    this.loading = false;
  }
}
export default AccountEditForm;
</script>
