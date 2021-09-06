<template>
  <div>
    <forget-password />

    <contacts />
  </div>
</template>

<script lang="ts">
import { Component, Mixins } from "vue-property-decorator";
import PageView from "../mixin/page";
import Contacts from "../components/setting/Contacts.vue";
import ForgetPassword from "../components/setting/ForgetPassword.vue";

@Component({
  components: {
    Contacts,
    ForgetPassword
  }
})
class HelpPage extends Mixins(PageView) {
  get title() {
    return "Help";
  }

  get layout() {
    return this.meta.smAndDown ? "popup" : "desktop-open";
  }

  get meta() {
    const smAndDown = this.$vuetify.breakpoint.smAndDown;

    return { smAndDown };
  }
}
export default HelpPage;
</script>

<style lang="scss" scoped>
::v-deep {
  .label-1 {
    font-size: 16px;
    font-weight: 500;
    color: #ffffff;
  }
}
</style>
