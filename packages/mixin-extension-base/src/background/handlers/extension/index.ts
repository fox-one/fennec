import type { ActionTypes, ActionPayloads, ActionResponses } from "../../types";
import type {
  ApproveAuthPayload,
  RejectAuthPayload,
  UpdateAuthUrlPayload
} from "../../types/auth";
import type {
  CreateAccountPayload,
  UnlockKeyringPayload,
  SignAuthorizeTokenPayload,
  GetEncryptedPinPayload,
  ExportKeyringPayload,
  RemoveAccountPayload,
  ExportAllAccountsPayload
} from "../../types/keyring";
import type { State } from "../../../state/types";
import {
  ApproveMultisigsPayload,
  ApproveTransferPayload,
  RejectTransferPayload,
  RejectMultisigsPayload
} from "../../types/wallet";
import {
  SelectAccountPaylod,
  UpdateAccountProvidersPayload
} from "../../types/preference";
import type { OpenWindowPayload } from "../../types/platform";
import type { ResetApplicationPayload } from "../../types/app";

import createAuthHandlers from "./auth";
import createKeyringHandlers from "./keyring";
import createPreferenceHandlers from "./preference";
import createWalletHandlers from "./wallet";
import createPlatformHandlers from "./platform";
import createAppHandlers from "./app";

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
      ...createPreferenceHandlers(state),
      ...createWalletHandlers(state),
      ...createPlatformHandlers(state),
      ...createAppHandlers(state)
    };

    switch (action) {
      // Accounts
      case "pri_(authorize.requests)":
        return handlers.authorizeSubscribe(id, port);

      case "pri_(authorize.approve)":
        return handlers.approveAuthorize(payload as ApproveAuthPayload);

      case "pri_(authorize.reject)":
        return handlers.rejectAuthorize(payload as RejectAuthPayload);

      case "pri_(authorize.authUrls)":
        return handlers.getAuthUrls();

      case "pri_(authorize.update)":
        return handlers.updateAuthUrl(payload as UpdateAuthUrlPayload);

      // Keyring
      case "pri_(keyring.createAccount)":
        return handlers.createAccount(payload as CreateAccountPayload);

      case "pri_(keyring.subscribe)":
        return handlers.createKeyringStateSubscribe(id, port);

      case "pri_(keyring.unlock)":
        return handlers.tryUnlockKeyring(payload as UnlockKeyringPayload);

      case "pri_(keyring.signAuthorizeToken)":
        return handlers.signAuthorizeToken(
          payload as SignAuthorizeTokenPayload
        );

      case "pri_(keyring.getEncryptedPin)":
        return handlers.getEncryptedPin(payload as GetEncryptedPinPayload);

      case "pri_(keyring.exportAccount)":
        return handlers.exportAccount(payload as ExportKeyringPayload);

      case "pri_(keyring.exportAllAccounts)":
        return handlers.exportAllAccounts(payload as ExportAllAccountsPayload);

      case "pri_(keyring.removeAccount)":
        return handlers.removeAccount(payload as RemoveAccountPayload);

      // Preference
      case "pri_(preference.subscribe)":
        return handlers.preferenceSubscribe(id, port);

      case "pri_(preference.completeOnboarding)":
        return handlers.completeOnboarding();

      case "pri_(preference.selectAccount)":
        return handlers.selectAccount(payload as SelectAccountPaylod);

      case "pri_(preference.updateAccountProviders)":
        return handlers.updateAccountProviders(
          payload as UpdateAccountProvidersPayload
        );

      // Wallet
      case "pri_(transfer.list)":
        return handlers.transferSubscribe(id, port);

      case "pri_(transfer.approve)":
        return handlers.approveTransfer(payload as ApproveTransferPayload);

      case "pri_(transfer.reject)":
        return handlers.rejectTransfer(payload as RejectTransferPayload);

      case "pri_(multisigs.list)":
        return handlers.multisigPaymentSubscribe(id, port);

      case "pri_(multisigs.approve)":
        return handlers.approveMultisigsPayment(
          payload as ApproveMultisigsPayload
        );

      case "pri_(multisigs.reject)":
        return handlers.rejectMultisigsPayment(
          payload as RejectMultisigsPayload
        );

      case "pri_(rejectMultisigsPayment)":
        return handlers.rejectMultisigsPayment(
          payload as RejectMultisigsPayload
        );

      // Platform
      case "pri_(platform.closePopup)":
        return handlers.closePopup();

      case "pri_(platform.openWindow)":
        return handlers.openWindow(payload as OpenWindowPayload);

      case "pri_(platform.onWindowClose)":
        return handlers.onWindowClose();

      // App
      case "pri_(app.resetApplication)":
        return handlers.resetApplication(payload as ResetApplicationPayload);

      default:
        throw new Error(`Unable to handle message of type ${action}`);
    }
  };
}
