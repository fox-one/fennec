import type { SendMessage } from "@foxone/mixin-extension-base/inject/types";
import type { KeyringMemState } from "@foxone/mixin-extension-base/state/keyring";

export default function (sendMessage: SendMessage) {
  return {
    createNewAccount(configStr: string) {
      return sendMessage("pri(keyring.createAccount)", { configStr });
    },

    subscribeKeyingState(cb: (state: KeyringMemState) => void) {
      return sendMessage("pri(keyring.subscribe)", null, cb);
    },

    initializePassword(password: string) {
      return sendMessage("pri(keyring.initializePassword)", { password });
    },

    tryUnlockKeyring(password: string) {
      return sendMessage("pri(kering.unlock)", { password });
    },

    signAuthorizeToken(uri: string, method: string, data: any) {
      return sendMessage("pri(kering.signAuthorizeToken)", {
        uri,
        method,
        data
      });
    },

    encryptPin(pin: string) {
      return sendMessage("pri(kering.encryptPin)", { pin });
    }
  };
}
