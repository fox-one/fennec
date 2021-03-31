import type { KeyringMemState } from "../../state/keyring";

export interface CreateAccountPayload {
  keystore: string;
  password: string;
}

export interface SignAuthorizeTokenPlayload {
  clientId: string;
  uri: string;
  method: string;
  data: any;
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
  "pub(keyring.signAuthorizeToken)": [SignAuthorizeTokenPayload, string];

  "pri(keyring.subscribe)": [null, boolean, KeyringMemState];
  "pri(keyring.createAccount)": [CreateAccountPayload, string[]];
  "pri(keyring.unlock)": [UnlockKeyringPayload, boolean];
  "pri(keyring.signAuthorizeToken)": [SignAuthorizeTokenPayload, string];
  "pri(kerying.encryptPin)": [EncryptPinPayload, string];
  "pri(keyring.getEncryptedPin)": [GetEncryptedPinPayload, string];
  "pri(keyring.exportAccount)": [ExportKeyringPayload, string];
  "pri(keyring.exportAllAccounts)": [ExportAllAccountsPayload, string];
  "pri(keyring.removeAccount)": [RemoveAccountPayload, boolean];
}
