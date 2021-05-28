import type { ActionTypes, ActionPayloads, ActionResponses } from "../../types";
import type { AuthTabPayload } from "../../types/auth";
import type { State } from "../../../state/types";
import type { SignAuthorizeTokenPayload } from "../../types/keyring";
import type {
  MultiSigsPaymentPayload,
  SignClientTokenPayload
} from "../../types/wallet";
import type { CreateTransferPayload } from "@foxone/mixin-api/types";

import createHandlers from "./handlers";

export type ActionParams<T extends ActionTypes> = {
  id: string;
  action: T;
  payload?: ActionPayloads[T];
  port: chrome.runtime.Port;
  url: string;
};

export default function (state: State) {
  return async function <T extends ActionTypes>(
    params: ActionParams<T>
  ): Promise<ActionResponses[keyof ActionResponses]> {
    const { action, payload, url } = params;
    const handlers = createHandlers(state);

    if (action === "pub_(phishing.redirectIfDenied)") {
      return handlers.redirectIfPhishing(url);
    }

    switch (action) {
      case "pub_(authorize.tab)":
        return handlers.authorize(payload as AuthTabPayload, url);

      case "pub_(accounts.ensureUnlocked)":
        return handlers.ensureUnLocked();

      case "pub_(accounts.list)":
        return handlers.accountsList();

      case "pub_(keyring.signAuthorizeToken)":
        return handlers.signAuthorizeToken(
          payload as SignAuthorizeTokenPayload
        );

      case "pub_(transfer.request)":
        return handlers.requestTransfer(payload as CreateTransferPayload);

      case "pub_(multisigs.request)":
        return handlers.requestMultisigsPayment(
          payload as MultiSigsPaymentPayload
        );

      case "pub_(token.sign)":
        return handlers.signClientToken(payload as SignClientTokenPayload);

      default:
        throw new Error(`Unable to handle message of type ${action}`);
    }
  };
}
