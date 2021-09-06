<template>
  <f-app-bar flat custom-content app color="bg" class="pa-0">
    <v-layout>
      <v-flex class="text-center nav-title">
        {{ title }}
      </v-flex>
    </v-layout>
  </f-app-bar>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component
class TopNav extends Vue {
  @Prop() title!: string;
}
export default TopNav;
</script>
