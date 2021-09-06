import type { SendMessage } from "@foxone/fennec-base/inject/types";
import type { KeyringMemState } from "@foxone/fennec-base/state/keyring";

export default function (sendMessage: SendMessage) {
  return {
    createNewAccount(keystore: string, password: string) {
      return sendMessage("pri_(keyring.createAccount)", { keystore, password });
    },

    exportAccount(clientId: string, password: string) {
      return sendMessage("pri_(keyring.exportAccount)", { clientId, password });
    },

    exportAllAccounts(password: string) {
      return sendMessage("pri_(keyring.exportAllAccounts)", { password });
    },

    getEncryptedPin(password: string) {
      return sendMessage("pri_(keyring.getEncryptedPin)", { password });
    },

    removeAccount(clientId: string, password: string) {
      return sendMessage("pri_(keyring.removeAccount)", { clientId, password });
    },

    signAuthorizeToken(uri: string, method: string, data: string) {
      return sendMessage("pri_(keyring.signAuthorizeToken)", {
        data,
        method,
        uri
      });
    },

    subscribeKeyingState(cb: (state: KeyringMemState) => void) {
      return sendMessage("pri_(keyring.subscribe)", null, cb);
    },

    tryUnlockKeyring(password: string) {
      return sendMessage("pri_(keyring.unlock)", { password });
    },

    lockKeyring() {
      return sendMessage("pri_(keyring.lock)");
    }
  };
}
