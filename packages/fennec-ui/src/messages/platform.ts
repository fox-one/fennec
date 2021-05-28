import { SendMessage } from "@foxone/fennec-base/inject/types";

export default function (sendMessage: SendMessage) {
  return {
    closePopup() {
      return sendMessage("pri_(platform.closePopup)");
    },

    openWindow(path: string) {
      return sendMessage("pri_(platform.openWindow)", { path });
    }
  };
}
