import Vue from "vue";
import Vuetify from "vuetify/lib";
import VueClipboard from "vue-clipboard2";
import InfiniteScroll from "vue-infinite-scroll";
import VueI18n from "vue-i18n";
import UIKit from "@foxone/uikit";
import VuetifyOptions from "./vuetify";
import I18nOptions from "./i18n";
import Inject from "./inject";

import "@foxone/uikit/build/index.min.css";
import "../components/icons";
import "../components/common";

export default function (): { vuetify: Vuetify; i18n: VueI18n } {
  const vuetify = new Vuetify(VuetifyOptions);

  Vue.use(Vuetify);
  Vue.use(VueClipboard);
  Vue.use(InfiniteScroll);
  Vue.use(VueI18n);
  Vue.use(UIKit, {
    vuetify,
    dialog: { flat: true },
    toast: { centered: true, top: false }
  });
  Vue.use(Inject);

  return {
    i18n: new VueI18n(I18nOptions),
    vuetify
  };
}
