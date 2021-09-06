<template>
  <v-btn icon small @click="handleLock">
    <v-icon>$FIconLock</v-icon>
  </v-btn>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
class ActionLock extends Vue {
  async handleLock() {
    await this.$messages.lockKeyring();

    this.$utils.app.resetWalletData(this);
    this.$router.push({ name: "unlock" });
  }
}
export default ActionLock;
</script>
