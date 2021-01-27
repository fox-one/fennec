import Vue from "vue";
import { Component } from "vue-property-decorator";
import { AppModuleKey, MutationTypes } from "../store/modules/app/types";

@Component
class PageView extends Vue {
  get title() {
    return "";
  }

  get layout() {
    return "default-layout";
  }

  get appbar() {
    return {};
  }

  setProperties() {
    const appbar = { ...this.appbar, title: this.title };
    this.$store.commit(AppModuleKey + MutationTypes.SET_APPBAR, appbar);
    this.$store.commit(AppModuleKey + MutationTypes.SET_LAYOUT, this.layout);
  }

  created() {
    this.setProperties();
  }
}

export default PageView;
