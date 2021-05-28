import type { AppBarState } from "../types";
import Vue from "vue";
import { Component } from "vue-property-decorator";
import { AppModulePerfix, MutationTypes } from "../store/modules/app/types";

@Component
class PageView extends Vue {
  get title(): string {
    return "";
  }

  get layout(): string {
    return "default-layout";
  }

  get appbar(): Partial<AppBarState> {
    return {};
  }

  setProperties(): void {
    const appbar = { ...this.appbar, title: this.title };

    this.$store.commit(AppModulePerfix + MutationTypes.SET_APPBAR, appbar);
    this.$store.commit(AppModulePerfix + MutationTypes.SET_LAYOUT, this.layout);
  }

  created(): void {
    this.setProperties();
  }
}

export default PageView;
