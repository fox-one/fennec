<template>
  <v-main>
    <v-container fill-height align-center justify-center class="pa-4">
      <error-panel v-bind="$attrs" />
    </v-container>
  </v-main>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import ErrorPanel from "../../components/error/ErrorPanel.vue";

@Component({
  inheritAttrs: false,
  components: {
    ErrorPanel
  }
})
class ErrorLayout extends Vue {}
export default ErrorLayout;
</script>
