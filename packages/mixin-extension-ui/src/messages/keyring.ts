import type { SendMessage } from "@foxone/mixin-extension-base/inject/types";
import type { KeyringMemState } from "@foxone/mixin-extension-base/state/keyring";

export default function (sendMessage: SendMessage) {
  return {
    createNewAccount(keystore: string, password: string) {
      return sendMessage("pri(keyring.createAccount)", { keystore, password });
    },

    exportAccount(clientId: string, password: string) {
      return sendMessage("pri(keyring.exportAccount)", { clientId, password });
    },

    exportAllAccounts(password: string) {
      return sendMessage("pri(keyring.exportAllAccounts)", { password });
    },

    removeAccount(clientId: string, password: string) {
      return sendMessage("pri(keyring.removeAccount)", { password, clientId });
    },

    subscribeKeyingState(cb: (state: KeyringMemState) => void) {
      return sendMessage("pri(keyring.subscribe)", null, cb);
    },

    tryUnlockKeyring(password: string) {
      return sendMessage("pri(keyring.unlock)", { password });
    },

    signAuthorizeToken(uri: string, method: string, data: any) {
      return sendMessage("pri(keyring.signAuthorizeToken)", {
        uri,
        method,
        data
      });
    },

    getEncryptedPin(password: string) {
      return sendMessage("pri(keyring.getEncryptedPin)", { password });
    }
  };
}
