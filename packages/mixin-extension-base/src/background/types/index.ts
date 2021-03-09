import type { AuthActionSignatures } from "./auth";
import type { KeyringActionSignatures } from "./keyring";
import type { PreferenceSignatures } from "./preference";
import type { WalletActionSignatures } from "./wallet";

type IsNull<T, K extends keyof T> = { [K1 in Exclude<keyof T, K>]: T[K1] } &
  T[K] extends null
  ? K
  : never;

type NullKeys<T> = { [K in keyof T]: IsNull<T, K> }[keyof T];

type KeysWithDefinedValues<T> = {
  [K in keyof T]: T[K] extends undefined ? never : K;
}[keyof T];

type NoUndefinedValues<T> = {
  [K in KeysWithDefinedValues<T>]: T[K];
};

export type ActionSignatures = AuthActionSignatures &
  KeyringActionSignatures &
  PreferenceSignatures &
  WalletActionSignatures;

export type ActionTypes = keyof ActionSignatures;

// Request

export type ActionPayloads = {
  [K in keyof ActionSignatures]: ActionSignatures[K][0];
};

export type ActionTypesWithNullPayload = NullKeys<ActionPayloads>;

// Response

export type ActionResponses = {
  [K in keyof ActionSignatures]: ActionSignatures[K][1];
};

export type ActionResponseType<
  T extends keyof ActionSignatures
> = ActionSignatures[T][1];

// Subscription

export type SubscriptionMessageTypes = NoUndefinedValues<
  { [T in keyof ActionSignatures]: ActionSignatures[T][2] }
>;

export type ActionTypesWithSubscriptions = keyof SubscriptionMessageTypes;

export type ActionTypesWithNoSubscriptions = Exclude<
  ActionTypes,
  keyof ActionTypesWithSubscriptions
>;

export type RequestMessage<T extends ActionTypes> = {
  id: string;
  action: T;
  origin: "page" | "extension";
  payload?: ActionPayloads[T];
};

export type ResponseMessage<T extends ActionTypes> = {
  error?: string;
  id: string;
  res?: ActionResponses[T];
  subscription?: any;
};
