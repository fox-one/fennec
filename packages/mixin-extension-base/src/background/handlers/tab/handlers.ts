import type { AuthTabPayload } from "../../types/auth";
import type { State } from "../../../state/types";

import extension from "extensionizer";
import { PHISHING_PAGE_REDIRECT } from "../../../constants";
import { SignAuthorizeTokenPayload } from "../../types/keyring";
import {
  MultiSigsPaymentPayload,
  SignClientTokenPayload
} from "../../types/wallet";
import { unix } from "@foxone/mixin-sdk/encrypt";
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

    requestMultisigsPayment(payload: MultiSigsPaymentPayload) {
      return state.wallet.multisigsTransactionPayment(payload.transaction);
    },

    async redirectIfPhishing(url: string): Promise<boolean> {
      const isDenied = checkIfDenied(url);
      if (isDenied) {
        redirectPhishingLanding();
      }

      return false;
    },

    signClientToken(payload: SignClientTokenPayload) {
      const selectedAccount = state.preference.preference.seletedAccount;
      if (!selectedAccount) {
        throw new Error("No selected account");
      }
      return state.keyring.signClientToken({
        clientId: selectedAccount,
        uri: "/me",
        method: "GET",
        data: "",
        scp: "FULL",
        expire: unix() + 60 * 60 * 24,
        payload
      });
    }
  };
}

export type TabActionHandlers = ReturnType<typeof createHandlers>;
