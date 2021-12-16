<template>
  <div class="policies" :class="classes">
    <check-box-field :value.sync="bindAccepted">
      <template #label>
        <p class="ma-0">
          {{ $t("accept") }}
          <a
            :href="meta.POLICY_URL"
            target="_blank"
            class="white--text font-weight-bold"
            @click.stop
          >
            {{ $t("fennec.privacy.policy") }}
          </a>
          {{ $t("and") }}
          <a
            :href="meta.TERMS_URL"
            target="_blank"
            class="white--text font-weight-bold"
            @click.stop
          >
            {{ $t("fennec.terms.use") }}
          </a>
        </p>
      </template>
    </check-box-field>
  </div>
</template>

<script lang="ts">
import { Component, Prop, PropSync, Vue } from "vue-property-decorator";
import { EVENTS, POLICY_URL, TERMS_URL } from "../../defaults";

@Component
class PoliciesModal extends Vue {
  @Prop({ type: Boolean, default: false }) focus!: boolean;

  @PropSync("accepted") bindAccepted!: boolean;

  animate = false;

  animateTimeout = -1;

  get meta() {
    return {
      POLICY_URL,
      TERMS_URL
    };
  }

  get classes() {
    return { "policies--animated": this.animate };
  }

  mounted() {
    this.$root.$on(EVENTS.CHECK_PRIVACY_TERMS, () => {
      this.animate = false;

      this.$nextTick(() => {
        this.animate = true;
        window.clearTimeout(this.animateTimeout);
        this.animateTimeout = window.setTimeout(
          () => (this.animate = false),
          380
        );
      });
    });
  }
}
export default PoliciesModal;
</script>

<style lang="scss" scoped>
.policies {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.policies--animated {
  animation-name: animate-policies;
  animation-duration: 0.38s;
  animation-timing-function: cubic-bezier(0.33, 1, 0.68, 1);
}

@keyframes animate-policies {
  0% {
    transform: translateX(0px);
  }

  20% {
    transform: translateX(12px);
  }

  40% {
    transform: translateX(0px);
  }

  60% {
    transform: translateX(-2px);
  }

  100% {
    transform: translateX(0px);
  }
}
</style>
