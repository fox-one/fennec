import type { SendMessage } from "@foxone/mixin-extension-base/inject/types";
import type { KeyringMemState } from "@foxone/mixin-extension-base/state/keyring";

export default function (sendMessage: SendMessage) {
  return {
    createNewAccount(configStr: string) {
      return sendMessage("pri(keyring.createAccount)", { configStr });
    },

    exportAccount(clientId: string) {
      return sendMessage("pri(keyring.exportAccount)", { clientId });
    },

    subscribeKeyingState(cb: (state: KeyringMemState) => void) {
      return sendMessage("pri(keyring.subscribe)", null, cb);
    },

    initializePassword(password: string) {
      return sendMessage("pri(keyring.initializePassword)", { password });
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

    encryptPin(pin: string) {
      return sendMessage("pri(kerying.encryptPin)", { pin });
    },

    getEncryptedPin(password: string) {
      return sendMessage("pri(keyring.getEncryptedPin)", { password });
    }
  };
}
