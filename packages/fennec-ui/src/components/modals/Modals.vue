<template>
  <div>
    <password-modal />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import PasswordModal from "./PasswordModal.vue";

@Component({
  components: {
    PasswordModal
  }
})
class Modals extends Vue {}
export default Modals;
</script>
