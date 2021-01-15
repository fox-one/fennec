import type { ActionTypes, ActionPayloads } from "../../types/actions";
import createHandlers from "./handlers";

export type ActionParams<T extends ActionTypes> = {
  id: string;
  action: T;
  payload?: ActionPayloads[T];
  port: chrome.runtime.Port;
  url: string;
};

export default function (state) {
  return async function <T extends ActionTypes>(params: ActionParams<T>) {
    const { payload, action } = params;
    const handlers = createHandlers(state);

    switch (action) {
      case "pub(authorize.tab)":
        return handlers.authorize(payload as any);

      default:
        throw new Error(`Unable to handle message of type ${action}`);
    }
  };
}
