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

export interface KeyringActionSignatures {
  "pri(keyring.createAccount)": [CreateAccountPayload, null];
  "pri(keyring.subscribe)": [null, boolean, KeyringMemState];
}
