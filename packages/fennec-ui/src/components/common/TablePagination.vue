<template>
  <div v-if="loading || !empty" class="pagination">
    <f-button v-if="!end" small text :loading="loading" @click="$emit('next')">
      <span class="mr-1">More</span>
      <v-icon size="12">$IconCollapse</v-icon>
    </f-button>

    <span v-else class="label-1">{{ text }}</span>
  </div>
</template>

<script lang="ts">
import { Component, Vue, InjectReactive, Prop } from "vue-property-decorator";

@Component
class TablePagination extends Vue {
  @Prop() noMoreDataText!: string;

  @InjectReactive()
  loading;

  @InjectReactive()
  end;

  @InjectReactive()
  empty;

  get text() {
    return this.noMoreDataText;
  }
}
export default TablePagination;
</script>

<style lang="scss" scoped>
.pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 500;
  height: 56px;
  border-top: thin solid rgba(255, 255, 255, 0.05);
}

.label-1 {
  font-weight: 400;
}
</style>
