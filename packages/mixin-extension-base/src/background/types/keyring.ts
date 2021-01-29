import { MixinAccount } from "@foxone/mixin-sdk/keyring";
import type { KeyringMemState } from "../../state/keyring";

export interface CreateAccountPayload {
  configStr: string;
}

export interface SignAuthorizeTokenPlayload {
  clientId: string;
  uri: string;
  method: string;
  params: any;
}

export interface InitializedPasswordPayload {
  password: string;
}

export interface UnlockKeyringPayload {
  password: string;
}

export interface KeyringActionSignatures {
  "pri(keyring.subscribe)": [null, boolean, KeyringMemState];

  "pri(keyring.createAccount)": [CreateAccountPayload, MixinAccount[]];
  "pri(keyring.initializePassword)": [InitializedPasswordPayload, boolean];
  "pri(kering.unlock)": [UnlockKeyringPayload, boolean];
}
