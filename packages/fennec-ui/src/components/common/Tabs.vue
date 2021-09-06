<template>
  <f-tabs
    :value="value"
    :ripple="false"
    grow
    slider
    active-class="white--text"
    color="white"
    disable-slider-length
    slider-size="2"
    @change="(v) => $emit('change', v)"
  >
    <v-tab v-for="(tab, index) in tabs" :key="index" :ripple="false">
      <span>{{ tab.text }}</span>
    </v-tab>

    <f-divider class="tab-divider" />
  </f-tabs>
</template>

<script lang="ts">
import { Component, Vue, Model, Prop } from "vue-property-decorator";

@Component({
  inheritAttrs: false
})
class Tabs extends Vue {
  @Model("change") value!: string;

  @Prop() tabs;
}
export default Tabs;
</script>

<style lang="scss" scoped>
.tab-divider {
  position: absolute;
  bottom: 0;
  width: 100%;
}
</style>
