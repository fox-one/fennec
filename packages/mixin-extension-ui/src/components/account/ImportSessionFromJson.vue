<template>
  <v-file-input
    v-model="file"
    flat
    solo
    hide-details
    truncate-length="15"
    accept="json"
    placeholder="Keystore"
    background-color="transparent"
    class="f-bg-greyscale-5"
    :prepend-icon="$icons.mdiPaperclip"
  />
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";

@Component
class ImportSessionFromJson extends Vue {
  file: File | null = null;

  @Watch("file")
  handleFileChange() {
    if (this.file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.$emit("select", e.target?.result);
      };
      reader.readAsText(this.file);
    }
  }
}
export default ImportSessionFromJson;
</script>
