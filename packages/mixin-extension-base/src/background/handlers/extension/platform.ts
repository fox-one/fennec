import type { State } from "../../../state/types";
import type { OpenWindowPayload } from "../../types/platform";
import extension from "extensionizer";
import { ALLOWED_PATH } from "@foxone/mixin-extension-base/constants";

export default function (state: State) {
  return {
    closePopup() {
      state.platform.closePopup();
      return true;
    },

    openPopup() {
      return state.platform.showPopup();
    },

    openWindow(opts: OpenWindowPayload) {
      const path = opts.path;
      const url = `${extension.extension.getURL("index.html")}#${path}`;
      if (!ALLOWED_PATH.includes(path)) {
        throw new Error(`Not Allowed to open the url: ${url}`);
      }

      chrome.tabs.create({ url });
      return true;
    },

    onWindowClose() {
      console.log("window closed");
      return true;
    }
  };
}
