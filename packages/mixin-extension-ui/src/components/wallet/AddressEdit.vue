<template>
  <f-bottom-sheet>
    <template #activator="{ on }">
      <v-icon small @click.stop class="ml-1" v-on="on">
        {{ $icons.mdiSquareEditOutline }}
      </v-icon>
    </template>
    <template #title> Edit Address </template>
    <div class="pa-5">
      <address-form :asset="asset" />
    </div>
  </f-bottom-sheet>
</template>

<script lang="ts">
import { Address, Asset } from "@foxone/mixin-sdk/types";
import { Component, Vue, Prop } from "vue-property-decorator";
import AddressForm from "./AddressForm.vue";

@Component({
  components: {
    AddressForm
  }
})
class AddressEdit extends Vue {
  @Prop() asset!: Asset | null;

  @Prop() address!: Address;
}
export default AddressEdit;
</script>
