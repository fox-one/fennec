import Vue from "vue";
import Vuetify from "vuetify";
import VueClipboard from "vue-clipboard2";
import InfiniteScroll from "vue-infinite-scroll";
import VueI18n from "vue-i18n";
import UIKit from "@foxone/uikit";
import VuetifyOptions from "./vuetify";
import I18nOptions from "./i18n";
import Inject from "./inject";

export default function (): { vuetify: Vuetify; i18n: VueI18n } {
  Vue.use(Vuetify);
  Vue.use(VueClipboard);
  Vue.use(InfiniteScroll);
  Vue.use(VueI18n);
  Vue.use(UIKit);
  Vue.use(Inject);

  return {
    i18n: new VueI18n(I18nOptions),
    vuetify: new Vuetify(VuetifyOptions)
  };
}
