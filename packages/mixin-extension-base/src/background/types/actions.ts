import type { ExtensionActionHandlers } from "../handlers/extension/handlers";
import type { TabActionHandlers } from "../handlers/tab/handlers";

export interface ActionHandlerMap {
  // Extension actions
  "pri(accounts.subscribe)": ExtensionActionHandlers["accountsSubscribe"];
  "pri(authorize.approve)": ExtensionActionHandlers["approveAuthorize"];

  //Tab actions
  "pub(accounts.list)": TabActionHandlers["accountsList"];
  "pub(authorize.tab)": TabActionHandlers["authorize"];
  "pub(phishing.redirectIfDenied)": TabActionHandlers["redirectIfPhishing"];
}

export type ActionTypes = keyof ActionHandlerMap;

export type ActionPayloads = {
  [ActionTypes in keyof ActionHandlerMap]: Parameters<ActionHandlerMap[ActionTypes]>[0];
};

export type ActionResponses = {
  [T in ActionTypes]: ReturnType<ActionHandlerMap[T]>;
};

export type ResponseType<T extends ActionTypes> = ReturnType<ActionHandlerMap[T]>;
