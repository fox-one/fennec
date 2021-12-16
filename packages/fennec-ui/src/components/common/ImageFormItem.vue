<template>
  <div class="image-form-item">
    <input
      ref="input"
      type="file"
      class="input"
      accept="image/png, image/jpeg, image/jpg, image/svg"
      @change="handleFileChange"
    />

    <v-avatar size="48" class="image">
      <v-img :src="avatar" @load="handleAttachmentLoaded" />
    </v-avatar>

    <div class="image-edit-action" @click="handleClickImage">
      <v-icon>$FIconEdit</v-icon>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Model } from "vue-property-decorator";

@Component
class ImgaeFormItem extends Vue {
  @Model("change") value!: string | null | ArrayBuffer;

  loading = false;

  file: File | null = null;

  get avatar() {
    return this.value || require("../../assets/images/default-avatar.png");
  }

  mounted() {
    if (!this.value || typeof this.value !== "string") return;
    this.file = new File([], this.value);
  }

  handleClickImage() {
    const input = this.$refs.input as any;

    input.click();
  }

  handleAttachmentLoaded() {
    this.loading = false;
  }

  handleFileChange(e) {
    const file = e.target.files[0];

    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      this.$uikit.toast.error({
        message: this.$t("message.image.max.size") as string
      });

      return;
    }

    this.loading = true;
    this.file = file;
    const reader = new FileReader();

    reader.onload = (e) => {
      this.loading = false;
      this.$emit("change", e.target?.result ?? null);
    };

    reader.readAsDataURL(file);
  }
}
export default ImgaeFormItem;
</script>

<style lang="scss" scoped>
.image-form-item {
  position: relative;
  cursor: pointer;

  &:hover {
    .image-edit-action {
      visibility: visible;
    }
  }

  .image-edit-action {
    position: absolute;
    top: -1px;
    left: -1px;
    bottom: -1px;
    right: -1px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(57, 52, 83, 0.8);
    backdrop-filter: blur(24px);
    border-radius: 50px;
    visibility: hidden;
  }
}

.input {
  display: none;
}

.image {
  cursor: pointer;
}
</style>
