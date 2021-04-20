import type AuthState from "./auth";
import type KeyringState from "./keyring";
import type PreferenceState from "./preference";
import type WalletState from "./wallet";
import type PlatformState from "./platform";
import type AppState from "./app";
import type { AuthUrlInfo } from "./auth";

export interface Resolver<T> {
  reject: (err: Error) => void;
  resolve: (result: T) => void;
}

export interface State {
  auth: AuthState;
  keyring: KeyringState;
  preference: PreferenceState;
  wallet: WalletState;
  platform: PlatformState;
  app: AppState;
}

export interface AccountProvider {
  type: "built-in" | "custom";
  value: string;
}

export interface PreferenceStore {
  completeOnboarding: boolean;
  seletedAccount: undefined | string;
  accountProviders: AccountProvider[];
}

export interface Store {
  version?: number;
  authUrls: Record<string, AuthUrlInfo>;
  keyring: string | undefined;
  preference: PreferenceStore;
}
