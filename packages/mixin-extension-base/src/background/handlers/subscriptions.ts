import { ActionTypesWithSubscriptions, SubscriptionMessageTypes } from "../types";

export type Subscriptions = Record<string, chrome.runtime.Port>;

const subscriptions: Subscriptions = {};

export function createSubscription<T extends ActionTypesWithSubscriptions>(
  id: string,
  port: chrome.runtime.Port
): (data: SubscriptionMessageTypes[T]) => void {
  subscriptions[id] = port;

  return (subscription: unknown): void => {
    if (subscriptions[id]) {
      port.postMessage({ id, subscription });
    }
  };
}

export function unsubscribe(id: string) {
  if (subscriptions[id]) {
    console.log(`un subsctibe from ${id}`);
    delete subscriptions[id];
  } else {
    console.error(`unable to unsubscribe from ${id}`);
  }
}
