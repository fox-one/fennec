import { MixinAccount } from "@foxone/mixin-sdk/keyring";
import type { KeyringMemState } from "../../state/keyring";

export interface CreateAccountPayload {
  configStr: string;
}

export interface SignAuthorizeTokenPlayload {
  clientId: string;
  uri: string;
  method: string;
  data: any;
}

export interface InitializedPasswordPayload {
  password: string;
}

export interface UnlockKeyringPayload {
  password: string;
}

export interface SignAuthorizeTokenPayload {
  method: string;
  data: any;
  uri: string;
}

export interface EncryptPinPayload {
  pin: string;
}

export interface GetEncryptedPinPayload {
  password: string;
}

export interface ExportKeyringPayload {
  clientId: string;
}

export interface KeyringActionSignatures {
  "pri(keyring.subscribe)": [null, boolean, KeyringMemState];

  "pri(keyring.createAccount)": [CreateAccountPayload, string[]];
  "pri(keyring.initializePassword)": [InitializedPasswordPayload, boolean];
  "pri(keyring.unlock)": [UnlockKeyringPayload, boolean];
  "pri(keyring.signAuthorizeToken)": [SignAuthorizeTokenPayload, string];
  "pri(kerying.encryptPin)": [EncryptPinPayload, string];
  "pri(keyring.getEncryptedPin)": [GetEncryptedPinPayload, string];
  "pri(keyring.exportAccount)": [ExportKeyringPayload, string];
}
