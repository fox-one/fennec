import type { AuthTabPayload } from "../../types/auth";
import type { State } from "../../../state/types";

import extension from "extensionizer";
import { PHISHING_PAGE_REDIRECT } from "../../../constants";
import { SignAuthorizeTokenPayload } from "../../types/keyring";
import {
  MultiSigsPaymentPayload,
  SignClientTokenPayload
} from "../../types/wallet";
import { unix } from "@foxone/mixin-api/encrypt";
import { CreateTransferPayload } from "@foxone/mixin-api/types";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
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

    authorize(payload: AuthTabPayload, url: string): Promise<boolean> {
      return state.auth.authorizeUrl(url, payload);
    },

    ensureUnLocked() {
      return state.keyring.ensureUnLocked();
    },

    redirectIfPhishing(url: string): Promise<boolean> {
      const isDenied = checkIfDenied(url);

      if (isDenied) {
        redirectPhishingLanding();
      }

      return Promise.resolve(false);
    },

    requestMultisigsPayment(payload: MultiSigsPaymentPayload) {
      return state.wallet.multisigsTransactionPayment(payload.transaction);
    },

    requestTransfer(payload: CreateTransferPayload) {
      return state.wallet.transferRequest(payload);
    },

    signAuthorizeToken({ data, method, uri }: SignAuthorizeTokenPayload) {
      const selectedAccount = state.preference.preference.seletedAccount;

      if (!selectedAccount) {
        throw new Error("No selected account");
      }

      const payload = {
        clientId: selectedAccount,
        data,
        method: method.toUpperCase(),
        uri
      };

      return state.keyring.signAuthorizeToken(payload);
    },

    signClientToken(payload: SignClientTokenPayload) {
      const selectedAccount = state.preference.preference.seletedAccount;

      if (!selectedAccount) {
        throw new Error("No selected account");
      }

      return state.keyring.signClientToken({
        clientId: selectedAccount,
        data: "",
        expire: unix() + 60 * 60 * 24,
        method: "GET",
        payload,
        scp: "FULL",
        uri: "/me"
      });
    }
  };
}

export type TabActionHandlers = ReturnType<typeof createHandlers>;
