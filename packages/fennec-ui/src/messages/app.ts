import { SendMessage } from "@foxone/fennec-base/inject/types";

export default function (sendMessage: SendMessage) {
  return {
    resetApplication() {
      return sendMessage("pri_(app.resetApplication)");
    }
  };
}
