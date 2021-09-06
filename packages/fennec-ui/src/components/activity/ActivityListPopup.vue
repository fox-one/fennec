<template>
  <v-list>
    <v-list-item
      v-for="(item, index) in activities"
      :key="index"
      class="px-4"
      @click="handleClick(item)"
    >
      <v-list-item-content>
        <v-list-item-title class="title-text">
          <span>{{ item.text }}</span>
          <confirm-field :item="item" />
        </v-list-item-title>
        <v-list-item-subtitle class="label-text">
          <span class="">{{ item.createdAtText }}</span>
        </v-list-item-subtitle>
      </v-list-item-content>
      <div class="text-right">
        <div class="title-text">
          <activity-amount-field :item="item" />
        </div>
        <div class="label-text f-number">{{ item.amountFiat }}</div>
      </div>
    </v-list-item>

    <activity-empty :items="activities" />

    <table-pagination
      no-more-data-text="No More Activity"
      v-bind="$attrs"
      v-on="$listeners"
    />
  </v-list>
</template>

<script lang="ts">
import { GlobalMutations } from "@foxone/fennec-ui/store/types";
import { Component, Vue, Prop } from "vue-property-decorator";
import ActivityAmountField from "./ActivityAmountField.vue";
import ConfirmField from "./ConfirmField.vue";
import ActivityEmpty from "./ActivityEmpty.vue";

@Component({
  components: {
    ActivityEmpty,
    ActivityAmountField,
    ConfirmField
  }
})
class ActivityListPopup extends Vue {
  @Prop() activities;

  get meta() {
    return {};
  }

  handleClick(item) {
    this.$store.commit(GlobalMutations.SET_SNAPSHOT_DETAIL, item);

    this.$router.push({
      name: "snapshot-id",
      params: { id: item.id },
      query: { type: item.component }
    });
  }
}
export default ActivityListPopup;
</script>

<style lang="scss" scoped>
.title-text {
  font-size: 13px;
  font-weight: 500;
}

.label-text {
  font-size: 12px;
  margin-top: 4px;
}

.pagination {
  width: 100%;
  border-top: none !important;
}
</style>
