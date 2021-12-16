<template>
  <f-bottom-sheet
    v-model="dialog"
    title="Select sending method"
    wapper-in-desktop="dialog"
    :dialog-props="{ maxWidth: 360 }"
  >
    <template #activator="{ on }">
      <slot name="activator" :on="on" />
    </template>

    <div class="px-4">
      <send-method-item
        v-for="(item, index) in items"
        :key="index"
        :icon="item.icon"
        :name="item.name"
        :desc="item.desc"
        @click.native="handleClick(item)"
      />
    </div>
  </f-bottom-sheet>
</template>

<script lang="ts">
import { Asset } from "@foxone/mixin-api/types";
import { Component, Vue, Prop } from "vue-property-decorator";
import SendMethodItem from "./SendMethodItem.vue";

@Component({
  components: {
    SendMethodItem
  }
})
class SendMethodModal extends Vue {
  @Prop() asset!: Asset;

  dialog = false;

  items = [
    {
      icon: require("../../assets/images/icon-mixin.png"),
      name: this.$t("contact"),
      desc: this.$t("contact.desc"),
      value: "contact"
    },
    {
      icon: require("../../assets/images/icon-address.png"),
      name: this.$t("address"),
      desc: this.$t("address.desc"),
      value: "address"
    }
  ];

  handleClick({ value }) {
    if (value === "contact") {
      this.$router.push({
        name: "send-transfer",
        query: { preset: this.asset?.asset_id ?? "" }
      });
    } else {
      this.$router.push({
        name: "send-withdraw",
        query: { preset: this.asset?.asset_id ?? "" }
      });
    }
  }
}
export default SendMethodModal;
</script>
