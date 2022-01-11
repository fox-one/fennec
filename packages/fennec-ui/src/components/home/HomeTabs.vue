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
    <v-tab
      v-for="(tab, index) in tabs"
      :key="index"
      :ripple="false"
      class="tab-content"
    >
      <span>{{ tab.text }}</span>

      <v-icon v-if="index === 1" size="16" class="ml-1" @click="handleRefresh">
        $FIconRefresh4PBold
      </v-icon>
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

.tab-content {
  display: flex;
  align-items: center;
  line-height: 1;
}
</style>
