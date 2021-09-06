<template>
  <component :is="meta.component" v-bind="$attrs" />
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import DepositMethodsDesktop from "../deposit/DepositMethodsDesktop.vue";
import DepositMethodsPopup from "../deposit/DepositMethodsPopup.vue";

@Component({
  components: {
    DepositMethodsDesktop,
    DepositMethodsPopup
  }
})
class DepositMethods extends Vue {
  get meta() {
    const smAndDown = this.$vuetify.breakpoint.smAndDown;
    const component = smAndDown
      ? "deposit-methods-popup"
      : "deposit-methods-desktop";

    return {
      component
    };
  }
}
export default DepositMethods;
</script>
