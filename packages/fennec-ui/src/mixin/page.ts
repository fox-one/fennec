import { Component, Vue, Watch } from "vue-property-decorator";
import { EVENTS } from "../defaults";
import { GlobalMutations } from "../store/types";

@Component
class PageView extends Vue {
  isCover = false;

  get title(): string {
    return "";
  }

  get layout(): string {
    const smAndDown = this.$vuetify.breakpoint.smAndDown;

    if (this.isCover) {
      return "cover";
    }

    return smAndDown ? "popup" : "desktop";
  }

  get appbar(): any {
    return {};
  }

  get titleNode(): any {
    return null;
  }

  get tailNode(): any {
    return null;
  }

  get isDesktop() {
    return !this.$vuetify.breakpoint.smAndDown;
  }

  @Watch("isDesktop")
  handleLayoutChange() {
    this.setProperties();
  }

  setProperties(): void {
    const appbar = { title: this.title, ...this.appbar };

    this.$store.commit(GlobalMutations.SET_APPBAR, appbar);
    this.$store.commit(GlobalMutations.SET_LAYOUT, this.layout);

    this.$root.$emit(EVENTS.SET_NAV_TITLE, this.titleNode);
    this.$root.$emit(EVENTS.SET_NAV_TAIL, this.tailNode);

    console.log("emit events set nav tail");
  }

  mounted(): void {
    this.setProperties();
  }
}

export default PageView;
