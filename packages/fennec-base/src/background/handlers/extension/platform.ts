import type { State } from "../../../state/types";
import type { OpenWindowPayload } from "../../types/platform";
import extension from "extensionizer";
import { ALLOWED_PATH } from "@foxone/fennec-base/constants";

export default function (state: State) {
  return {
    closePopup() {
      state.platform.closePopup().catch((error) => {
        console.log("close popup", error);
      });

      return true;
    },

    onWindowClose() {
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

      chrome.windows.getCurrent(({ id }) => {
        chrome.tabs.query(
          { windowId: id, url: extension.extension.getURL("index.html") },
          (tabs) => {
            const tab = tabs[0];

            if (tab && tab.id) {
              chrome.tabs.update(tab.id, { active: true });
            } else {
              chrome.tabs.create({ url });
            }
          }
        );
      });

      return true;
    }
  };
}
