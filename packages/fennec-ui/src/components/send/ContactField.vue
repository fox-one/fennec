<template>
  <select-field
    :value="id"
    v-bind="$attrs"
    v-on="$listeners"
    @click.native="handleClick"
  >
    <div>
      <user-avatar v-if="Boolean(id)" :id="id" />
      <div v-else class="label-1">Select From Contacts</div>
    </div>
  </select-field>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import SelectField from "../common/SelectField";

@Component({
  components: {
    SelectField
  }
})
class ContactField extends Vue {
  @Prop() id!: string;

  handleClick() {
    this.$router.push({ name: "send-contacts" });
  }
}
export default ContactField;
</script>

<style lang="scss" scoped>
.label-1 {
  font-size: 16px;
}
</style>
