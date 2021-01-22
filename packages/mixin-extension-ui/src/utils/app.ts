import { AuthorizeRequest } from "@foxone/mixin-extension-base/state/auth";
import { MutationTypes as AuthMutationTypes, AuthModulePerfix } from "../store/modules/auth/types";
import { MutationTypes as AppMutationTypes, AppModuleKey } from "../store/modules/app/types";

export function init(vm: Vue) {
  vm.$store.commit(AppModuleKey + AppMutationTypes.SET_INITING, true);
  vm.$messages.subscribeAuthorizeRequests((requests: AuthorizeRequest[]) => {
    vm.$store.commit(AuthModulePerfix + AuthMutationTypes.UPDATE_AUTHORIZE_URLS, requests);
    vm.$store.commit(AppModuleKey + AppMutationTypes.SET_INITING, true);
  });
}
