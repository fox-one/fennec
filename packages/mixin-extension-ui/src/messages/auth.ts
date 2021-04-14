import { SendMessage } from "@foxone/mixin-extension-base/inject/types";
import {
  AuthorizeRequest,
  AuthUrlInfo
} from "@foxone/mixin-extension-base/state/auth";

export default function (sendMessage: SendMessage) {
  return {
    rejectAuthRequest(id: string): Promise<boolean> {
      return sendMessage("pri_(authorize.reject)", { id });
    },

    approveAuthRequest(id: string): Promise<boolean> {
      return sendMessage("pri_(authorize.approve)", { id });
    },

    subscribeAuthorizeRequests(
      cb: (requests: AuthorizeRequest[]) => void
    ): Promise<boolean> {
      return sendMessage("pri_(authorize.requests)", null, cb);
    },

    getAuthUrls() {
      return sendMessage("pri_(authorize.authUrls)");
    },

    updateAuthUrl(id: string, data: AuthUrlInfo) {
      return sendMessage("pri_(authorize.update)", { id, data });
    }
  };
}
