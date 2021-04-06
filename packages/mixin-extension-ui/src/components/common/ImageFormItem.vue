<template>
  <div>
    <v-file-input
      accept="image/png, image/jpeg, image/jpg, image/svg"
      :loading="loading"
      :clear-icon="$icons.mdiClose"
      :rule="rules"
      :value="file"
      :label="$attrs.label"
      filled
      hide-details
      class="f-input image-input"
      @change="handleFileChange"
    />
    <div v-if="value" class="mt-2">
      <v-img
        :src="value"
        class="rounded"
        height="80"
        width="80"
        @load="handleAttachmentLoaded"
      />
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

  get rules() {
    return [(v) => v.size < 2 * 1024 * 1024 || "Max size is 2M"];
  }

  mounted() {
    if (!this.value || typeof this.value !== "string") return;
    this.file = new File([], this.value);
  }

  handleAttachmentLoaded() {
    this.loading = false;
  }

  handleFileChange(file) {
    if (!file) return;
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
.image-input {
  ::v-deep {
    .v-input__prepend-outer {
      display: none;
    }
  }
}
</style>
