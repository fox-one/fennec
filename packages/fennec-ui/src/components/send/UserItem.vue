<template>
  <v-layout class="pa-4 rounded user-item">
    <div>
      <v-avatar size="24">
        <v-img :src="meta.avatar" />
      </v-avatar>
    </div>
    <v-flex class="ml-4">
      <div class="font-weight-bold">{{ meta.name }}</div>
      <div class="label-1">Mixin ID: {{ meta.mixinId }}</div>
    </v-flex>
  </v-layout>
</template>

<script lang="ts">
import { User } from "@foxone/mixin-api/types";
import { GlobalActions, GlobalGetters } from "@foxone/fennec-ui/store/types";
import { Component, Vue, Prop, Watch } from "vue-property-decorator";

@Component
class UserItem extends Vue {
  @Prop() id!: string;

  get meta() {
    const getUserById = this.$store.getters[GlobalGetters.GET_USER_BY_ID];
    const user: User | undefined = getUserById(this.id);

    const avatar = user?.avatar_url ?? "";
    const name = user?.full_name ?? "";
    const mixinId = user?.identity_number;

    return { user, name, avatar, mixinId };
  }

  @Watch("id", { immediate: true })
  handleChange() {
    this.$store.dispatch(GlobalActions.LOAD_USER, { id: this.id });
  }
}
export default UserItem;
</script>

<style lang="scss" scoped>
.user-item {
  cursor: pointer;
  background-color: var(--v-bg_card-base);
  margin-bottom: 16px;

  &:hover {
    background-color: #5d587b;
  }
}
</style>
