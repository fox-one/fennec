import type { SendMessage } from "@foxone/fennec-base/inject/types";
import {
  AccountProvider,
  PreferenceStore
} from "@foxone/fennec-base/state/types";

export default function (sendMessage: SendMessage) {
  return {
    completeOnboarding() {
      return sendMessage("pri_(preference.completeOnboarding)");
    },

    selectAccount(clientId: string) {
      return sendMessage("pri_(preference.selectAccount)", { clientId });
    },

    subscribePreferenceState(cb: (state: PreferenceStore) => void) {
      return sendMessage("pri_(preference.subscribe)", null, cb);
    },

    updateAccountProviders(providers: AccountProvider[]) {
      return sendMessage("pri_(preference.updateAccountProviders)", {
        providers
      });
    }
  };
}
