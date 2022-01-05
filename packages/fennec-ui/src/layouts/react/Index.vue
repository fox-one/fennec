<template>
  <v-main>
    <top-nav v-if="meta.smAndDown" :title="item.title" />

    <v-container fill-height align-start justify-center>
      <div class="content" :class="classes">
        <component :is="item.component" />
      </div>
    </v-container>
  </v-main>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import TopNav from "./TopNav.vue";
import AuthReact from "../../components/react/auth.vue";
import MultisigsReact from "../../components/react/multisigs.vue";
import TransferReact from "../../components/react/transfer.vue";

@Component({
  components: {
    TopNav,
    AuthReact,
    MultisigsReact,
    TransferReact
  }
})
class ReactLayout extends Vue {
  get meta() {
    const smAndDown = this.$vuetify.breakpoint.smAndDown;

    return { smAndDown };
  }

  get classes() {
    return { "content--desktop": !this.meta.smAndDown };
  }

  get items() {
    return [
      { component: "auth-react", title: this.$t("authorize") },
      { component: "transfer-react", title: this.$t("transfer") },
      { component: "multisigs-react", title: this.$t("multisig.transactions") }
    ];
  }

  get item() {
    const hasAuthRequest = this.$store.state.auth.authorizeRequests.length > 0;
    const hasTransferReq =
      this.$store.state.transfer.transferRequests.length > 0;

    const index = hasAuthRequest ? 0 : hasTransferReq ? 1 : 2;
    const item = this.items[index];

    return item;
  }
}
export default ReactLayout;
</script>

<style lang="scss" scoped>
.content {
  max-width: 360px;
  width: 100%;

  &--desktop {
    padding-top: 44px;
  }
}
</style>
