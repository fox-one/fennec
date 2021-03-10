import type AuthState from "./auth";
import type KeyringState from "./keyring";
import type PerferenceState from "./preference";
import type ProviderState from "./provider";
import type WalletState from "./wallet";
import type PlatformState from "./platform";
import type { AuthUrlInfo } from "./auth";

export interface Resolver<T> {
  reject: (err: Error) => void;
  resolve: (result: T) => void;
}

export interface State {
  auth: AuthState;
  keyring: KeyringState;
  preference: PerferenceState;
  provider: ProviderState;
  wallet: WalletState;
  platform: PlatformState;
}

export interface PerferenceStore {
  completeOnboarding: boolean;
  seletedAccount: undefined | string;
}

export interface Store {
  authUrls: Record<string, AuthUrlInfo>;
  keyring: string | undefined;
  preference: PerferenceStore;
}
