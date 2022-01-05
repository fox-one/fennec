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

      <v-btn v-if="index === 1" icon small class="ml-2" @click="handleRefresh">
        <v-icon>$FIconRestore</v-icon>
      </v-btn>
    </v-tab>

    <f-divider class="tab-divider" />
  </f-tabs>
</template>

<script lang="ts">
import { EVENTS } from "../../defaults";
import { Component, Vue, Model } from "vue-property-decorator";

@Component({
  inheritAttrs: false
})
class Tabs extends Vue {
  @Model("change") value!: string;

  get tabs() {
    return [{ text: this.$t("assets") }, { text: this.$t("activity") }];
  }

  handleRefresh() {
    this.$root.$emit(EVENTS.REFRESH_ACTIVITY);
  }
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
