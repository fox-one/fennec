import type { State } from "../../../state/types";
import type {
  CreateAccountPayload,
  UnlockKeyringPayload,
  SignAuthorizeTokenPayload,
  GetEncryptedPinPayload,
  ExportKeyringPayload
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

    createAccount({ keystore, password }: CreateAccountPayload) {
      return state.keyring.addNewAccount(keystore, password);
    },

    exportAccount({ clientId, password }: ExportKeyringPayload) {
      return state.keyring.exportAccount(clientId, password);
    },

    tryUnlockKeyring({ password }: UnlockKeyringPayload) {
      return state.keyring.unlock(password);
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

    getEncryptedPin({ password }: GetEncryptedPinPayload) {
      const selectedAccount = state.preference.preference.seletedAccount;
      if (!selectedAccount) {
        throw new Error("No selected account");
      }

      return state.keyring.getEncryptedPin(selectedAccount, password);
    }
  };
}
