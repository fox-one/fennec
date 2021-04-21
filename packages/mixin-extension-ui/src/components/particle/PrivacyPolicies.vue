<template>
  <div class="policies">
    <v-checkbox
      v-model="bindAccepted"
      hide-details
      color="primary"
      :off-icon="$icons.mdiCheckboxBlankCircleOutline"
      :on-icon="$icons.mdiCheckboxMarkedCircle"
    >
      <template #label>
        <p class="text-center caption ma-0">
          Accept
          <a :href="meta.POLICY_URL" target="_blank">Fennec Privacy Policy</a>
          and
          <a :href="meta.TERMS_URL" target="_blank">Fennec Terms of Use</a>
        </p>
      </template>
    </v-checkbox>
    <p v-show="focus && !bindAccepted" class="error--text caption mt-2">
      You need to accept Privacy Policy and Terms of Use before start to use.
    </p>
  </div>
</template>

<script lang="ts">
import { Component, Prop, PropSync, Vue } from "vue-property-decorator";
import { POLICY_URL, TERMS_URL } from "../../defaults";

@Component
class PoliciesModal extends Vue {
  @Prop({ type: Boolean, default: false }) focus!: boolean;

  @PropSync("accepted") bindAccepted!: boolean;

  get meta() {
    return {
      POLICY_URL,
      TERMS_URL
    };
  }
}
export default PoliciesModal;
</script>

<style lang="scss" scoped>
.policies {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
