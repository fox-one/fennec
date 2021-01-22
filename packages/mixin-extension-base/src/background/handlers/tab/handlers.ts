import type { AuthTabPayload } from "../../types/auth";
import type { State } from "../../../state/types";

import extension from "extensionizer";
import { PHISHING_PAGE_REDIRECT } from "../../../constants";

function checkIfDenied(url: string) {
  // TODO: implements phishing detect
  return false;
}

function redirectPhishingLanding() {
  const url = `${extension.extension.getURL("index.html")}#${PHISHING_PAGE_REDIRECT}`;
  chrome.tabs.update({ url });
  return null;
}

export default function createHandlers(state: State) {
  return {
    accountsList() {
      return [];
    },

    authorize(payload: AuthTabPayload, url: string): Promise<boolean> {
      return state.auth.authorizeUrl(url, payload);
    },

    async redirectIfPhishing(url: string): Promise<boolean> {
      const isDenied = checkIfDenied(url);
      if (isDenied) {
        redirectPhishingLanding();
      }

      return false;
    }
  };
}

export type TabActionHandlers = ReturnType<typeof createHandlers>;
