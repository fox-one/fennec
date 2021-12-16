import { Component, Vue, Watch } from "vue-property-decorator";
import { EVENTS } from "../defaults";
import { GlobalMutations } from "../store/types";
import { getLocale } from "@foxone/utils/helper";
import dayjs from "dayjs";

@Component
class PageView extends Vue {
  isCover = false;

  get title(): any {
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

  setLang() {
    const locale = getLocale();

    this.$i18n.locale = locale;
    this.$vuetify.lang.current = locale;

    dayjs.locale(locale);
  }

  setProperties(): void {
    const appbar = { title: this.title, ...this.appbar };

    this.$store.commit(GlobalMutations.SET_APPBAR, appbar);
    this.$store.commit(GlobalMutations.SET_LAYOUT, this.layout);

    this.$root.$emit(EVENTS.SET_NAV_TITLE, this.titleNode);
    this.$root.$emit(EVENTS.SET_NAV_TAIL, this.tailNode);

    this.setLang();
  }

  mounted(): void {
    this.setProperties();
  }
}

export default PageView;
