import extension from "extensionizer";
import { PHISHING_PAGE_REDIRECT } from "../../../constants";
import { unix } from "@foxone/mixin-api/encrypt";
import { createSubscription, unsubscribe } from "../subscriptions";

import type { AuthTabPayload } from "../../types/auth";
import type { State } from "../../../state/types";
import type { CreateTransferPayload } from "@foxone/mixin-api/types";
import type { SignAuthorizeTokenPayload } from "../../types/keyring";
import type {
  MultiSigsPaymentPayload,
  SignClientTokenPayload
} from "../../types/wallet";

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

    accountsSubscribe(id: string, port: chrome.runtime.Port) {
      const cb = createSubscription<"pub_(accounts.subscribe)">(id, port);

      const handler = () => {
        const accounts = state.keyring.getAccounts();
        const current = state.preference.preference.seletedAccount;

        cb({ accounts, current });
      };

      const preferenceSubscription =
        state.preference.preferenceSubjection.subscribe(handler);
      const keyringSubscription =
        state.keyring.keyringMemStateSubject.subscribe(handler);

      port.onDisconnect.addListener(() => {
        unsubscribe(id);
        preferenceSubscription.unsubscribe();
        keyringSubscription.unsubscribe();
      });

      return true;
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
        throw new Error("[code:01] No selected account");
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
        throw new Error("[code:01] No selected account");
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
