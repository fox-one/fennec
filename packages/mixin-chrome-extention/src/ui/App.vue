<template>
  <div id="app" class="app">
    <component :is="layoutComponent">
      <router-view />
    </component>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import DefaultLayout from "@/ui/layouts/default/Index.vue";

@Component({
  components: {
    DefaultLayout
  }
})
class App extends Vue {
  get layout(): App.AppLayout {
    return this.$store.state.app.layout;
  }

  get layoutComponent() {
    switch (this.layout) {
      case "default":
        return "default-layout";
    }
    return "default-layout";
  }
}
export default App;
</script>

<style lang="scss" scoped>
.app {
  width: 400px;
  height: 800px;
}
</style>
