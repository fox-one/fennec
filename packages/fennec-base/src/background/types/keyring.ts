import type { KeyringMemState } from "../../state/keyring";

export interface CreateAccountPayload {
  keystore: string;
  password: string;
}

export interface SignAuthorizeTokenPlayload {
  clientId: string;
  uri: string;
  method: string;
  data: string;
}

export interface UnlockKeyringPayload {
  password: string;
}

export interface SignAuthorizeTokenPayload {
  method: string;
  data: string;
  uri: string;
  clientId?: string;
}

export interface EncryptPinPayload {
  pin: string;
}

export interface GetEncryptedPinPayload {
  password: string;
}

export interface ExportKeyringPayload {
  clientId: string;
  password: string;
}

export interface ExportAllAccountsPayload {
  password: string;
}

export interface RemoveAccountPayload {
  clientId: string;
  password: string;
}

export interface KeyringActionSignatures {
  "pub_(keyring.signAuthorizeToken)": [SignAuthorizeTokenPayload, string];

  "pri_(keyring.subscribe)": [null, boolean, KeyringMemState];
  "pri_(keyring.createAccount)": [CreateAccountPayload, string[]];
  "pri_(keyring.unlock)": [UnlockKeyringPayload, boolean];
  "pri_(keyring.lock)": [null, boolean];
  "pri_(keyring.signAuthorizeToken)": [SignAuthorizeTokenPayload, string];
  "pri_(kerying.encryptPin)": [EncryptPinPayload, string];
  "pri_(keyring.getEncryptedPin)": [GetEncryptedPinPayload, string];
  "pri_(keyring.exportAccount)": [ExportKeyringPayload, string];
  "pri_(keyring.exportAllAccounts)": [ExportAllAccountsPayload, string];
  "pri_(keyring.removeAccount)": [RemoveAccountPayload, boolean];
}
