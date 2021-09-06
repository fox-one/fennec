import type { State } from "../../../state/types";
import type {
  CreateAccountPayload,
  UnlockKeyringPayload,
  SignAuthorizeTokenPayload,
  GetEncryptedPinPayload,
  ExportKeyringPayload,
  RemoveAccountPayload,
  ExportAllAccountsPayload
} from "../../types/keyring";

import { createSubscription, unsubscribe } from "../subscriptions";

export default function (state: State) {
  return {
    createAccount({ keystore, password }: CreateAccountPayload) {
      return state.keyring.addNewAccount(keystore, password);
    },

    createKeyringStateSubscribe(id: string, port: chrome.runtime.Port) {
      const cb = createSubscription<"pri_(keyring.subscribe)">(id, port);
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

    exportAccount({ clientId, password }: ExportKeyringPayload) {
      return state.keyring.exportAccount(clientId, password);
    },

    exportAllAccounts({ password }: ExportAllAccountsPayload) {
      return state.keyring.exportAllAccounts(password);
    },

    getEncryptedPin({ password }: GetEncryptedPinPayload) {
      const selectedAccount = state.preference.preference.selectedAccount;

      if (!selectedAccount) {
        throw new Error("[code:01] No selected account");
      }

      return state.keyring.getEncryptedPin(selectedAccount, password);
    },

    removeAccount({ clientId, password }: RemoveAccountPayload) {
      return state.keyring.removeAccount(clientId, password);
    },

    signAuthorizeToken({
      clientId,
      data,
      method,
      uri
    }: SignAuthorizeTokenPayload) {
      let id = clientId;

      if (!id) {
        id = state.preference.preference.selectedAccount;

        if (!id) {
          throw new Error("[code:01] No selected account");
        }
      }

      const payload = {
        clientId: id,
        data,
        method: method.toUpperCase(),
        uri
      };

      return state.keyring.signAuthorizeToken(payload);
    },

    tryUnlockKeyring({ password }: UnlockKeyringPayload) {
      return state.keyring.unlock(password);
    },

    lockKeyring() {
      state.keyring.setLocked();

      return true;
    }
  };
}
