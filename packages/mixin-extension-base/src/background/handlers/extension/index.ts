import type { ActionTypes, ActionPayloads, ActionResponses } from "../../types";
import type { ApproveAuthPayload, RejectAuthPayload } from "../../types/auth";
import type { State } from "../../../state/types";

import createHandlers from "./handlers";

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
    const handlers = createHandlers(state);

    switch (action) {
      case "pri(accounts.subscribe)":
        return handlers.accountsSubscribe(id, port);

      case "pri(authorize.requests)":
        return handlers.authorizeSubscribe(id, port);

      case "pri(authorize.approve)":
        return handlers.approveAuthorize(payload as ApproveAuthPayload);

      case "pri(authorize.reject)":
        return handlers.rejectAuthorize(payload as RejectAuthPayload);

      default:
        throw new Error(`Unable to handle message of type ${action}`);
    }
  };
}
