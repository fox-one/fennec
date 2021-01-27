import type AuthState from "./auth";
import type KeyringState from "./keyring";
import type PerferenceState from "./preference";
import type { AuthUrlInfo } from "./auth";

export interface Resolver<T> {
  reject: (err: Error) => void;
  resolve: (result: T) => void;
}

export interface State {
  auth: InstanceType<typeof AuthState>;
  keyring: InstanceType<typeof KeyringState>;
  preference: InstanceType<typeof PerferenceState>;
}

export interface PerferenceStore {
  completeOnboarding: boolean;
}

export interface Store {
  authUrls: Record<string, AuthUrlInfo>;
  keyring: string[] | undefined;
  preference: PerferenceStore;
}
