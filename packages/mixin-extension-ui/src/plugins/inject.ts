import type { VueConstructor } from "vue";

import utils from "../utils";
import messages from "../messages";

export default function (Vue: VueConstructor) {
  Vue.prototype.$utils = utils;
  Vue.prototype.$messages = messages;
}

declare module "vue/types/vue" {
  export interface Vue {
    $utils: typeof utils;
    $messages: typeof messages;
  }
}

declare module "vuex/types/index" {
  interface Store<S> {
    $utils: typeof utils;
    $messages: typeof messages;
  }
}
