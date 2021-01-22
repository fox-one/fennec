import { AccountJson } from "@foxone/mixin-extension-base/background/types/account";
import { SendMessage } from "@foxone/mixin-extension-base/inject/types";
import { AuthorizeRequest } from "@foxone/mixin-extension-base/state/auth";

export default function (sendMessage: SendMessage) {
  return {
    rejectAuthRequest(id: string): Promise<boolean> {
      return sendMessage("pri(authorize.reject)", { id });
    },

    approveAuthRequest(id: string): Promise<boolean> {
      return sendMessage("pri(authorize.approve)", { id });
    },

    subscribeAccounts(cb: (accounts: AccountJson[]) => void): Promise<boolean> {
      return sendMessage("pri(accounts.subscribe)", null, cb);
    },

    subscribeAuthorizeRequests(cb: (requests: AuthorizeRequest[]) => void): Promise<boolean> {
      return sendMessage("pri(authorize.requests)", null, cb);
    }
  };
}
