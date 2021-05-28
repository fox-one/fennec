import type { State } from "../../../state/types";
import {
  SelectAccountPaylod,
  UpdateAccountProvidersPayload
} from "../../types/preference";
import { createSubscription, unsubscribe } from "../subscriptions";

export default function createPreferenceHandlers(state: State) {
  return {
    completeOnboarding() {
      return state.preference.completeOnboarding();
    },

    preferenceSubscribe(id: string, port: chrome.runtime.Port) {
      const cb = createSubscription<"pri_(preference.subscribe)">(id, port);
      const subscription = state.preference.preferenceSubjection.subscribe(
        (data) => {
          cb(data);
        }
      );

      port.onDisconnect.addListener(() => {
        unsubscribe(id);
        subscription.unsubscribe();
      });

      return true;
    },

    selectAccount({ clientId }: SelectAccountPaylod) {
      return state.preference.setSelectedAccount(clientId);
    },

    updateAccountProviders(paylaod: UpdateAccountProvidersPayload) {
      return state.preference.setAccountProviders(paylaod.providers);
    }
  };
}
