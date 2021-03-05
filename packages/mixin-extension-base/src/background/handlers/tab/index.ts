import type { ActionTypes, ActionPayloads, ActionResponses } from "../../types";
import type { AuthTabPayload } from "../../types/auth";
import type { State } from "../../../state/types";
import type { SignAuthorizeTokenPayload } from "../../types/keyring";

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
    const { payload, action, url } = params;
    const handlers = createHandlers(state);

    if (action === "pub(phishing.redirectIfDenied)") {
      return handlers.redirectIfPhishing(url);
    }

    switch (action) {
      case "pub(authorize.tab)":
        return handlers.authorize(payload as AuthTabPayload, url);

      case "pub(accounts.ensureUnlocked)":
        return handlers.ensureUnLocked();

      case "pub(accounts.list)":
        return handlers.accountsList();

      case "pub(keyring.signAuthorizeToken)":
        return handlers.signAuthorizeToken(
          payload as SignAuthorizeTokenPayload
        );

      default:
        throw new Error(`Unable to handle message of type ${action}`);
    }
  };
}
