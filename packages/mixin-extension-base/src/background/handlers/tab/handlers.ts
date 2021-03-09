import type { AuthTabPayload } from "../../types/auth";
import type { State } from "../../../state/types";

import extension from "extensionizer";
import { PHISHING_PAGE_REDIRECT } from "../../../constants";
import { SignAuthorizeTokenPayload } from "../../types/keyring";
import { CreateTransferPayload } from "@foxone/mixin-sdk/types";

function checkIfDenied(url: string) {
  // TODO: implements phishing detect
  return false;
}

function redirectPhishingLanding() {
  const url = `${extension.extension.getURL(
    "index.html"
  )}#${PHISHING_PAGE_REDIRECT}`;
  chrome.tabs.update({ url });
  return null;
}

export default function createHandlers(state: State) {
  return {
    accountsList() {
      return state.keyring.getAccounts();
    },

    ensureUnLocked() {
      return state.keyring.ensureUnLocked();
    },

    authorize(payload: AuthTabPayload, url: string): Promise<boolean> {
      return state.auth.authorizeUrl(url, payload);
    },

    signAuthorizeToken({ method, data, uri }: SignAuthorizeTokenPayload) {
      const selectedAccount = state.preference.preference.seletedAccount;
      if (!selectedAccount) {
        throw new Error("No selected account");
      }

      const payload = {
        clientId: selectedAccount,
        method: method.toUpperCase(),
        data,
        uri
      };
      return state.keyring.signAuthorizeToken(payload);
    },

    requestTransfer(payload: CreateTransferPayload) {
      return state.wallet.transferRequest(payload);
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
