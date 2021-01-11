<template>
  <div id="app" class="app">
    <router-view />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
class App extends Vue {}
export default App;
</script>

<style lang="scss" scoped>
.app {
  width: 400px;
  height: 800px;
}
</style>
