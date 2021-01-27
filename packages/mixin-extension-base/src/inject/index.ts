import type { Handlers, InjectOptions, InjectedData, InjectedWindow } from "./types";
import type {
  ActionTypes,
  ActionTypesWithNoSubscriptions,
  ActionTypesWithSubscriptions,
  ActionPayloads,
  ActionResponses,
  ActionTypesWithNullPayload,
  SubscriptionMessageTypes
} from "../background/types";
import type { RequestMessage, ResponseMessage } from "../background/types/message";

import Accounts from "./account";

const handlers: Handlers = {};
let idCounter = 0;

export function sendMessage<T extends ActionTypesWithNullPayload>(action: T): Promise<ActionResponses[T]>;
export function sendMessage<T extends ActionTypesWithNoSubscriptions>(
  action: T,
  payload: ActionPayloads[T]
): Promise<ActionResponses[T]>;
export function sendMessage<T extends ActionTypesWithSubscriptions>(
  action: T,
  payload: ActionPayloads[T],
  subscriber: (data: SubscriptionMessageTypes[T]) => void
): Promise<ActionResponses[T]>;

export function sendMessage<T extends ActionTypes>(
  action: T,
  payload?: ActionPayloads[T],
  subscriber?: (data: unknown) => void
): Promise<ActionResponses[T]> {
  return new Promise((resolve, reject) => {
    const id = `${Date.now()}.${++idCounter}`;

    handlers[id] = { reject, resolve, subscriber };

    const request: RequestMessage<T> = {
      id,
      action,
      payload,
      origin: "page"
    };

    window.postMessage(request, "*");
  });
}

export async function enable(origin: string): Promise<InjectedData> {
  await sendMessage("pub(authorize.tab)", { origin });

  return {
    accounts: new Accounts(sendMessage)
  };
}

export async function redirectIfPhishing(): Promise<boolean> {
  return await sendMessage("pub(phishing.redirectIfDenied)");
}

export function handleResponse<T extends ActionTypes>(data: ResponseMessage<T>) {
  const handler = handlers[data.id];

  if (!handler) {
    console.error(`Unknown response: ${JSON.stringify(data)}`);
    return;
  }

  if (!handler.subscriber) {
    delete handlers[data.id];
  }

  if (data.subscription) {
    handler.subscriber?.(data.subscription);
  } else if (data.error) {
    handler.reject(new Error(data.error));
  } else {
    handler.resolve(data.res);
  }
}

export function injectExtension(
  enable: (origin: string) => Promise<InjectedData>,
  { name, version }: InjectOptions
): void {
  const win = window as Window & InjectedWindow;
  win.__MIXIN__ = win.__MIXIN__ || {};

  win.__MIXIN__[name] = {
    enable: (origin: string): Promise<InjectedData> => enable(origin),
    version
  };
}
