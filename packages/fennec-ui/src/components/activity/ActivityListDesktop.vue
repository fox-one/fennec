<template>
  <v-data-table
    ref="table"
    :headers="headers"
    :items="activities"
    class="f-table"
    fixed-header
    hide-default-footer
    disable-pagination
    @click:row="handleClickRow"
  >
    <template #[`item.text`]="{ item }">
      <activity-text-field-desktop :item="item" />
    </template>

    <template #[`item.amount`]="{ item }">
      <activity-amount-field :item="item" />
    </template>

    <template #[`item.amountFiat`]="{ value }">
      <span class="f-number">{{ value }}</span>
    </template>

    <template #[`footer`]>
      <table-pagination
        no-more-data-text="No More Activity"
        v-bind="$attrs"
        v-on="$listeners"
      />
    </template>

    <template #no-data>
      <activity-empty :items="activities" />
    </template>
  </v-data-table>
</template>

<script lang="ts">
import { GlobalMutations } from "@foxone/fennec-ui/store/types";
import {
  Component,
  Vue,
  Prop,
  InjectReactive,
  Ref
} from "vue-property-decorator";
import ActivityAmountField from "./ActivityAmountField.vue";
import ActivityTextFieldDesktop from "./ActivityTextFieldDesktop.vue";
import ActivityEmpty from "./ActivityEmpty.vue";

@Component({
  components: {
    ActivityEmpty,
    ActivityAmountField,
    ActivityTextFieldDesktop
  }
})
class ActivityListDesktop extends Vue {
  @Prop() activities;

  @Ref("table") table;

  @InjectReactive() loading;

  get headers() {
    return [
      {
        text: "Transaction Type",
        value: "text",
        align: "start",
        sortable: false
      },
      {
        text: "Amount",
        value: "amount",
        sortable: false
      },
      {
        text: "Value Now",
        value: "amountFiat",
        sortable: false,
        align: "right"
      },
      {
        text: "Date",
        value: "createdAtText",
        sortable: false,
        align: "right"
      }
    ];
  }

  handleClickRow(item) {
    this.$store.commit(GlobalMutations.SET_SNAPSHOT_DETAIL, item);

    this.$router.push({
      name: "snapshot-id",
      params: { id: item.id },
      query: { type: item.component }
    });
  }
}
export default ActivityListDesktop;
</script>
