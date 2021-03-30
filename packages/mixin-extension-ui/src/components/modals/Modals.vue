<template>
  <div>
    <f-toast v-bind="toast" top :timeout="2000" @change="handleToastChange" />
    <f-paying-modal
      :show="paying.visible"
      :text="'Checking payment result'"
      z-index="1000"
      @cancel="handlePayingCancel"
    />
    <password-modal />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { State, Mutation } from "vuex-class";
import PasswordModal from "./PasswrodModal.vue";

@Component({
  components: {
    PasswordModal
  }
})
class Modals extends Vue {
  @State((state) => state.app.toast) toast!: MixinApp.AppToastState;

  @State((state) => state.app.paying) paying!: MixinApp.AppPayingState;

  @Mutation("checkout/SET_PAYING") setPaying;

  @Mutation("app/SET_TOAST") setToast;

  handleToastChange(val) {
    this.setToast({ show: val });
  }

  handlePayingCancel() {
    this.setPaying({ visible: false });
  }
}
export default Modals;
</script>
