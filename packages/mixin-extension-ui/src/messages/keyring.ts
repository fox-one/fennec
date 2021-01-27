import type { SendMessage } from "@foxone/mixin-extension-base/inject/types";
import type { KeyringMemState } from "@foxone/mixin-extension-base/state/keyring";

export default function (sendMessage: SendMessage) {
  return {
    createNewAccount(configStr: string) {
      return sendMessage("pri(keyring.createAccount)", { configStr });
    },

    subscribeKeyingState(cb: (state: KeyringMemState) => void) {
      return sendMessage("pri(keyring.subscribe)", null, cb);
    }
  };
}
