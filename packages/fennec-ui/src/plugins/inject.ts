import type { VueConstructor } from "vue";
import type createEndpoint from "@foxone/mixin-api/endpoints";

import utils from "../utils";
import messages from "../messages";
import endpoints from "../endpoints";

export default function (Vue: VueConstructor): void {
  Vue.prototype.$utils = utils;
  Vue.prototype.$messages = messages;
  Vue.prototype.$endpoints = endpoints;
}

declare module "vue/types/vue" {
  export interface Vue {
    $utils: typeof utils;
    $messages: typeof messages;
    $endpoints: ReturnType<typeof createEndpoint>;
  }
}

declare module "vuex/types/index" {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Store<S> {
    $utils: typeof utils;
    $messages: typeof messages;
    $endpoints: ReturnType<typeof createEndpoint>;
  }
}
