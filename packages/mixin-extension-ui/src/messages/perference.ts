import type { SendMessage } from "@foxone/mixin-extension-base/inject/types";
import { PerferenceStore } from "@foxone/mixin-extension-base/state/types";

export default function (sendMessage: SendMessage) {
  return {
    subscribePreferenceState(cb: (state: PerferenceStore) => void) {
      return sendMessage("pri(preference.subscribe)", null, cb);
    },

    completeOnboarding() {
      return sendMessage("pri(perference.completeOnboarding)");
    },

    selectAccount(clientId: string) {
      return sendMessage("pri(perference.selectAccount)", { clientId });
    }
  };
}
