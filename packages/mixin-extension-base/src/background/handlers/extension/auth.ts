import { AuthorizeRequest } from "@foxone/mixin-extension-base/state/auth";
import type { State } from "../../../state/types";

import { createSubscription, unsubscribe } from "../subscriptions";

export default function createAuthHandlers(state: State) {
  return {
    authorizeSubscribe(id: string, port: chrome.runtime.Port): boolean {
      const cb = createSubscription<"pri(authorize.requests)">(id, port);
      const subscription = state.auth.authSubject.subscribe(
        (requests: AuthorizeRequest[]) => {
          cb(requests);
        }
      );

      port.onDisconnect.addListener(() => {
        unsubscribe(id);
        subscription.unsubscribe();
      });

      return true;
    },

    approveAuthorize({ id }) {
      const queued = state.auth.getAuthRequest(id);
      if (!queued) {
        throw new Error("Cannot find auth request");
      }

      const { resolve } = queued;
      resolve(true);

      return true;
    },

    rejectAuthorize({ id }) {
      const queued = state.auth.getAuthRequest(id);
      if (!queued) {
        throw new Error("Cannot find auth request");
      }

      const { reject } = queued;
      reject(new Error("Reject"));

      return false;
    }
  };
}

export type ExtensionActionHandlers = ReturnType<typeof createAuthHandlers>;
