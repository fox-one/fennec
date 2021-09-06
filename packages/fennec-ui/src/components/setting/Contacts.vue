<template>
  <input-field
    label="Contact Fox.ONE support"
    hint="If you encounter a problem you can't solve, or have a better suggestion for a product, please feel free to contact us"
    class="mt-8"
  >
    <div class="bg_card rounded overflow-hidden">
      <f-list-item title="Twitter" @click="handleToTwitter">
        <template #head>
          <v-icon class="mr-1">$IconTwitter</v-icon>
        </template>
        <template #tail>
          <span></span>
        </template>
      </f-list-item>
      <f-list-item title="Github" @click="handleToGithub">
        <template #head>
          <v-icon class="mr-1">$IconGithub</v-icon>
        </template>
        <template #tail>
          <span></span>
        </template>
      </f-list-item>
    </div>
  </input-field>
</template>

<script lang="ts">
import { DOCS_URL } from "@foxone/fennec-ui/defaults";
import { Component, Vue } from "vue-property-decorator";

@Component
class Contacts extends Vue {
  handleToTwitter() {
    window.open(DOCS_URL.TWITTER);
  }

  handleToGithub() {
    window.open(DOCS_URL.GITHUB);
  }
}
export default Contacts;
</script>
