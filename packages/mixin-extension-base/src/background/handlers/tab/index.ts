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
    const { payload, action, url } = params;
    const handlers = createHandlers(state);

    if (action === "pub(phishing.redirectIfDenied)") {
      return handlers.redirectIfPhishing(url);
    }

    switch (action) {
      case "pub(authorize.tab)":
        return handlers.authorize(payload as any);

      case "pub(accounts.list)":
        return handlers.accountsList();

      default:
        throw new Error(`Unable to handle message of type ${action}`);
    }
  };
}
