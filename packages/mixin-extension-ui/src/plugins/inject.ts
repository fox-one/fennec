import type { VueConstructor } from "vue";

import utils from "../utils";
import messages from "../messages";
import icons from "../utils/icons";

export default function (Vue: VueConstructor) {
  Vue.prototype.$utils = utils;
  Vue.prototype.$messages = messages;
  Vue.prototype.$icons = icons;
}

declare module "vue/types/vue" {
  export interface Vue {
    $icons: typeof icons;
    $utils: typeof utils;
    $messages: typeof messages;
  }
}

declare module "vuex/types/index" {
  interface Store<S> {
    $icons: typeof icons;
    $utils: typeof utils;
    $messages: typeof messages;
  }
}
