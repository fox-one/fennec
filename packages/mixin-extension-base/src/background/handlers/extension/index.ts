import type { ActionTypes, ActionPayloads, ActionResponses } from "../../types";
import type { ApproveAuthPayload, RejectAuthPayload } from "../../types/auth";
import type {
  CreateAccountPayload,
  InitializedPasswordPayload,
  UnlockKeyringPayload,
  SignAuthorizeTokenPayload,
  EncryptPinPayload
} from "../../types/keyring";
import type { State } from "../../../state/types";

import createAuthHandlers from "./auth";
import createKeyringHandlers from "./keyring";
import createPreferenceHandlers from "./preference";

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

    const handlers = {
      ...createAuthHandlers(state),
      ...createKeyringHandlers(state),
      ...createPreferenceHandlers(state)
    };

    switch (action) {
      // Accounts
      case "pri(authorize.requests)":
        return handlers.authorizeSubscribe(id, port);

      case "pri(authorize.approve)":
        return handlers.approveAuthorize(payload as ApproveAuthPayload);

      case "pri(authorize.reject)":
        return handlers.rejectAuthorize(payload as RejectAuthPayload);

      // Keyring
      case "pri(keyring.createAccount)":
        return handlers.createAccount(payload as CreateAccountPayload);

      case "pri(keyring.subscribe)":
        return handlers.createKeyringStateSubscribe(id, port);

      case "pri(keyring.initializePassword)":
        return handlers.initializePassword(
          payload as InitializedPasswordPayload
        );

      case "pri(kering.unlock)":
        return handlers.tryUnlockKeyring(payload as UnlockKeyringPayload);

      case "pri(kering.signAuthorizeToken)":
        return handlers.signAuthorizeToken(
          payload as SignAuthorizeTokenPayload
        );

      case "pri(kering.encryptPin)":
        return handlers.encryptPin(payload as EncryptPinPayload);

      // Preference
      case "pri(preference.subscribe)":
        return handlers.perferenceSubscribe(id, port);

      case "pri(perference.completeOnboarding)":
        return handlers.completeOnboarding();

      default:
        throw new Error(`Unable to handle message of type ${action}`);
    }
  };
}
