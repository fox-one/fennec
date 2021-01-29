import type { State } from "../../../state/types";
import type {
  CreateAccountPayload,
  InitializedPasswordPayload,
  UnlockKeyringPayload
} from "../../types/keyring";
import { createSubscription, unsubscribe } from "../subscriptions";

export default function (state: State) {
  return {
    createKeyringStateSubscribe(id: string, port: chrome.runtime.Port) {
      const cb = createSubscription<"pri(keyring.subscribe)">(id, port);
      const subscription = state.keyring.keyringMemStateSubject.subscribe(
        (state) => {
          cb(state);
        }
      );

      port.onDisconnect.addListener(() => {
        unsubscribe(id);
        subscription.unsubscribe();
      });

      return true;
    },

    createAccount({ configStr }: CreateAccountPayload) {
      return state.keyring.addNewAccount(configStr);
    },

    initializePassword({ password }: InitializedPasswordPayload) {
      return state.keyring.initializePassword(password);
    },

    tryUnlockKeyring({ password }: UnlockKeyringPayload) {
      return state.keyring.submitPassword(password);
    }
  };
}
