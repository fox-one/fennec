import type { PerferenceStore } from "../../state/types";

export interface PreferenceSignatures {
  "pri(preference.subscribe)": [null, boolean, PerferenceStore];
  "pri(perference.completeOnboarding)": [null, boolean];
}
