import type { ActionTypes, ActionPayloads, ActionResponses, ResponseType } from "../../types/actions";
import createHandlers from "./handlers";

export type ActionParams<T extends ActionTypes> = {
  id: string;
  action: T;
  payload?: ActionPayloads[T];
  port: chrome.runtime.Port;
};

export default function (state) {
  return async function <T extends ActionTypes>(params: ActionParams<T>): Promise<ResponseType<keyof ActionResponses>> {
    const { action, payload } = params;
    const handlers = createHandlers(state);

    switch (action) {
      case "pri(accounts.subscribe)":
        return handlers.accountsSubscribe(payload as any);

      case "pri(authorize.approve)":
        return handlers.approveAuthorize();

      default:
        throw new Error(`Unable to handle message of type ${action}`);
    }
  };
}
