declare namespace State {
  import type { KeyringMemState } from "@foxone/fennec-base/state/auth";
  import type { User } from "@foxone/mixin-api/types";

  export type KeyringState = {
    keyring: KeyringMemState;
    profiles: User[];
    loading: boolean;
  };
}
