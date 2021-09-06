declare namespace State {
  import type { PreferenceStore } from "@foxone/fennec-base/state/types";

  export type Preferencestate = {
    preference: PreferenceStore;
  };
}
