import type { Message } from "@foxone/fennec-base/types";
import type {
  ActionTypes,
  ActionResponses,
  ActionPayloads,
  ActionTypesWithNullPayload,
  ActionTypesWithNoSubscriptions,
  ActionTypesWithSubscriptions,
  SubscriptionMessageTypes
} from "@foxone/fennec-base/background/types";

import extension from "extensionizer";
import { PORT_EXTENSION } from "@foxone/fennec-base/constants";
import createAuthMessages from "./auth";
import createKeyringMessages from "./keyring";
import createPreferenceMessages from "./preference";
import createWalletMessages from "./wallet";
import createPlatformMessages from "./platform";
import createAppMessages from "./app";

interface Handler {
  resolve: (data: unknown) => void;
  reject: (error: Error) => void;
  subscriber?: (data: unknown) => void;
  action: string;
}

type Handlers = Record<string, Handler>;

const port = extension.runtime.connect({ name: PORT_EXTENSION });
const handlers: Handlers = {};
let idCounter = 0;

port.onMessage.addListener((data: Message["data"]) => {
  const handler = handlers[data.id];

  if (!handler) {
    return;
  }

  if (!handler.subscriber) {
    delete handler[data.id];
  }

  if (data.subscription) {
    handler.subscriber?.(data.subscription);
  } else if (data.error) {
    handler.reject(new Error(data.error));
  } else {
    handler.resolve(data.res);
  }
});

export function sendMessage<T extends ActionTypesWithNullPayload>(
  action: T
): Promise<ActionResponses[T]>;
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
): Promise<void> {
  return new Promise((resolve: () => void, reject) => {
    const id = `${Date.now()}.${++idCounter}`;

    handlers[id] = { action, reject, resolve, subscriber };
    port.postMessage({ action, id, payload: payload || {} });
  });
}

export default {
  ...createAuthMessages(sendMessage),
  ...createKeyringMessages(sendMessage),
  ...createPreferenceMessages(sendMessage),
  ...createWalletMessages(sendMessage),
  ...createPlatformMessages(sendMessage),
  ...createAppMessages(sendMessage)
};
