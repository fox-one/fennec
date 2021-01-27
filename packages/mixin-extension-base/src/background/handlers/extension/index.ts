import type { ActionTypes, ActionPayloads, ActionResponses } from "../../types";
import type { ApproveAuthPayload, RejectAuthPayload } from "../../types/auth";
import type { CreateAccountPayload } from "../../types/keyring";
import type { State } from "../../../state/types";

import createAuthHandlers from "./auth";
import createKeyringHandlers from "./keyring";

export type ActionParams<T extends ActionTypes> = {
  id: string;
  action: T;
  payload?: ActionPayloads[T];
  port: chrome.runtime.Port;
};

export default function (state: State) {
  return async function <T extends ActionTypes>(
    params: ActionParams<T>
  ): Promise<ActionResponses[keyof ActionResponses]> {
    const { action, payload, id, port } = params;
    const handlers = { ...createAuthHandlers(state), ...createKeyringHandlers(state) };

    switch (action) {
      case "pri(authorize.requests)":
        return handlers.authorizeSubscribe(id, port);

      case "pri(authorize.approve)":
        return handlers.approveAuthorize(payload as ApproveAuthPayload);

      case "pri(authorize.reject)":
        return handlers.rejectAuthorize(payload as RejectAuthPayload);

      case "pri(keyring.createAccount)":
        return handlers.createAccount(payload as CreateAccountPayload);

      default:
        throw new Error(`Unable to handle message of type ${action}`);
    }
  };
}
