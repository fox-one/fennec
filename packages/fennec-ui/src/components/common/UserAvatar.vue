<template>
  <div class="user-avatar">
    <v-avatar :size="size">
      <v-img :src="meta.avatar" />
    </v-avatar>
    <span class="ml-2">{{ meta.name }}</span>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import { GlobalActions, GlobalGetters } from "@foxone/fennec-ui/store/types";
import { User } from "@foxone/mixin-api/types";

@Component
class UserAvatar extends Vue {
  @Prop() id!: string;

  @Prop({ type: [String, Number], default: 16 }) size!: string | number;

  get meta() {
    const getUserById = this.$store.getters[GlobalGetters.GET_USER_BY_ID];
    const user: User | undefined = getUserById(this.id);

    const avatar = user?.avatar_url ?? "";
    const name = user?.full_name ?? "";

    return { user, name, avatar };
  }

  @Watch("id")
  handleChange() {
    this.$store.dispatch(GlobalActions.LOAD_USER, { id: this.id });
  }
}
export default UserAvatar;
</script>

<style lang="scss" scoped>
.user-avatar {
  display: flex;
  align-items: center;
}
</style>
