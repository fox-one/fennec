import type { SendMessage } from "@foxone/mixin-extension-base/inject/types";
import {
  AccountProvider,
  PerferenceStore
} from "@foxone/mixin-extension-base/state/types";

export default function (sendMessage: SendMessage) {
  return {
    subscribePreferenceState(cb: (state: PerferenceStore) => void) {
      return sendMessage("pri_(preference.subscribe)", null, cb);
    },

    completeOnboarding() {
      return sendMessage("pri_(perference.completeOnboarding)");
    },

    selectAccount(clientId: string) {
      return sendMessage("pri_(perference.selectAccount)", { clientId });
    },

    updateAccountProviders(providers: AccountProvider[]) {
      return sendMessage("pri_(perference.updateAccountProviders)", {
        providers
      });
    }
  };
}
