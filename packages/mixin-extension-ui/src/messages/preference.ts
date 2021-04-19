import type { SendMessage } from "@foxone/mixin-extension-base/inject/types";
import {
  AccountProvider,
  PreferenceStore
} from "@foxone/mixin-extension-base/state/types";

export default function (sendMessage: SendMessage) {
  return {
    subscribePreferenceState(cb: (state: PreferenceStore) => void) {
      return sendMessage("pri_(preference.subscribe)", null, cb);
    },

    completeOnboarding() {
      return sendMessage("pri_(preference.completeOnboarding)");
    },

    selectAccount(clientId: string) {
      return sendMessage("pri_(preference.selectAccount)", { clientId });
    },

    updateAccountProviders(providers: AccountProvider[]) {
      return sendMessage("pri_(preference.updateAccountProviders)", {
        providers
      });
    }
  };
}
