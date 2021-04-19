import { SendMessage } from "@foxone/mixin-extension-base/inject/types";

export default function (sendMessage: SendMessage) {
  return {
    resetApplication(password: string) {
      return sendMessage("pri_(app.resetApplication)", { password });
    }
  };
}
