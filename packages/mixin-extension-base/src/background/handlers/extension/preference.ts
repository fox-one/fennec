import type { State } from "../../../state/types";
import { createSubscription, unsubscribe } from "../subscriptions";

export default function createPerferenceHandlers(state: State) {
  return {
    perferenceSubscribe(id: string, port: chrome.runtime.Port) {
      const cb = createSubscription<"pri(preference.subscribe)">(id, port);
      const subscription = state.preference.perferenceSubjection.subscribe((data) => {
        cb(data);
      });

      port.onDisconnect.addListener(() => {
        unsubscribe(id);
        subscription.unsubscribe();
      });

      return true;
    },

    completeOnboarding() {
      return state.preference.completeOnboarding();
    }
  };
}
