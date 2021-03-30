import type { PerferenceStore } from "../../state/types";

export interface SelectAccountPaylod {
  clientId: string;
}

export interface PreferenceSignatures {
  "pri(preference.subscribe)": [null, boolean, PerferenceStore];
  "pri(perference.completeOnboarding)": [null, boolean];
  "pri(perference.selectAccount)": [SelectAccountPaylod, boolean];
}
