<template>
  <information-item :title="title">
    <template #value>
      <v-layout align-center>
        <span class="success--text mr-2">
          {{ meta.confirmations }}/{{ meta.threshold }}
        </span>
        <confirm-field :item="value" />
      </v-layout>
    </template>
  </information-item>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import ConfirmField from "../activity/ConfirmField.vue";

@Component({
  components: {
    ConfirmField
  }
})
class SnapshotProgress extends Vue {
  @Prop() value!: any;

  @Prop() title!: string;

  get meta() {
    return {
      progress: this.value.progress,
      confirmations: this.value.confirmations,
      threshold: this.value.threshold
    };
  }
}
export default SnapshotProgress;
</script>
