<template>
  <f-bottom-sheet v-model="dialog">
    <template #activator="{ on }">
      <v-btn block small text color="primary" v-on="on">
        <v-icon small class="mr-2">
          {{ $icons.mdiPlusCircleOutline }}
        </v-icon>
        Address
      </v-btn>
    </template>
    <template #title> Add Address </template>
    <div class="pa-5">
      <address-form :asset="asset" @completed="handleCompleted" />
    </div>
  </f-bottom-sheet>
</template>

<script lang="ts">
import { Asset } from "@foxone/mixin-api/types";
import { Component, Vue, Prop } from "vue-property-decorator";
import AddressForm from "./AddressForm.vue";

@Component({
  components: {
    AddressForm
  }
})
class AddressAdd extends Vue {
  @Prop() asset!: Asset | null;

  dialog = false;

  handleCompleted() {
    this.dialog = false;
    this.$emit("reload");
  }
}
export default AddressAdd;
</script>
