import type { Message } from "@foxone/mixin-extension-base/types";
import type {
  ActionTypes,
  ActionResponses,
  ActionPayloads,
  ActionTypesWithNullPayload,
  ActionTypesWithNoSubscriptions,
  ActionTypesWithSubscriptions,
  SubscriptionMessageTypes
} from "@foxone/mixin-extension-base/background/types";

import extension from "extensionizer";
import { PORT_EXTENSION } from "@foxone/mixin-extension-base/constants";
import createAuthMessages from "./auth";
import createKeyringMessages from "./keyring";
import createPreferenceMessages from "./perference";

interface Handler {
  resolve: (data: any) => void;
  reject: (error: Error) => void;
  subscriber?: (data: any) => void;
  action: string;
}

type Handlers = Record<string, Handler>;

const port = extension.runtime.connect({ name: PORT_EXTENSION });
const handlers: Handlers = {};
let idCounter = 0;

port.onMessage.addListener((data: Message["data"]) => {
  const handler = handlers[data.id];

  if (!handler) {
    console.log(`Unknown response: ${JSON.stringify(data)}`);

    return;
  }

  if (!handler.subscriber) {
    delete handler[data.id];
  }

  console.log(`ui : response : ${handler.action} ${JSON.stringify(data)}`);

  if (data.subscription) {
    handler.subscriber?.(data.subscription);
  } else if (data.error) {
    handler.reject(new Error(data.error));
  } else {
    handler.resolve(data.response);
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
) {
  return new Promise((resolve, reject) => {
    const id = `${Date.now()}.${++idCounter}`;
    handlers[id] = { resolve, reject, subscriber, action };

    console.log(`ui : resquest : ${id} ${action} ${JSON.stringify(payload)}`);

    port.postMessage({ id, action, payload: payload || {} });
  });
}

export default {
  ...createAuthMessages(sendMessage),
  ...createKeyringMessages(sendMessage),
  ...createPreferenceMessages(sendMessage)
};
