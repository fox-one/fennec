import Vue from "vue";
import Vuetify from "vuetify";
import UIKit from "@foxone/uikit";
import VuetifyOptions from "./vuetify";
import Inject from "./inject";

export default function () {
  Vue.use(Vuetify);
  Vue.use(UIKit);

  Vue.use(Inject);

  return { vuetify: new Vuetify(VuetifyOptions) };
}
