import type { State } from "../../../state/types";
import type {
  CreateAccountPayload,
  InitializedPasswordPayload,
  UnlockKeyringPayload,
  SignAuthorizeTokenPayload,
  EncryptPinPayload
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
    },

    signAuthorizeToken({ method, data, uri }: SignAuthorizeTokenPayload) {
      const selectedAccount = state.preference.preference.seletedAccount;
      if (!selectedAccount) {
        throw new Error("No selected account");
      }

      const payload = {
        clientId: selectedAccount,
        method: method.toUpperCase(),
        data,
        uri
      };
      return state.keyring.signAuthorizeToken(payload);
    },

    encryptPin({ pin }: EncryptPinPayload) {
      const selectedAccount = state.preference.preference.seletedAccount;
      if (!selectedAccount) {
        throw new Error("No selected account");
      }
      return state.keyring.encryptPin(selectedAccount, pin);
    }
  };
}
