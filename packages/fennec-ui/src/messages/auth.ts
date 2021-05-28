import { SendMessage } from "@foxone/fennec-base/inject/types";
import { AuthorizeRequest, AuthUrlInfo } from "@foxone/fennec-base/state/auth";

export default function (sendMessage: SendMessage) {
  return {
    approveAuthRequest(id: string): Promise<boolean> {
      return sendMessage("pri_(authorize.approve)", { id });
    },

    getAuthUrls() {
      return sendMessage("pri_(authorize.authUrls)");
    },

    rejectAuthRequest(id: string): Promise<boolean> {
      return sendMessage("pri_(authorize.reject)", { id });
    },

    subscribeAuthorizeRequests(
      cb: (requests: AuthorizeRequest[]) => void
    ): Promise<boolean> {
      return sendMessage("pri_(authorize.requests)", null, cb);
    },

    updateAuthUrl(id: string, data: AuthUrlInfo) {
      return sendMessage("pri_(authorize.update)", { data, id });
    }
  };
}
