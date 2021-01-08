<template>
  <v-container>
    <h1>HELLO</h1>
    <f-tip type="info">
      this a tip
    </f-tip>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  head() {
    return {
      title: this.title,
    };
  },
})
class IndexPage extends Vue {
  get title() {
    return "hello";
  }
}
export default IndexPage;
</script>

<style lang="scss" scoped></style>
