import type { PerferenceStore, AccountProvider } from "../../state/types";

export interface SelectAccountPaylod {
  clientId: string;
}

export interface UpdateAccountProvidersPayload {
  providers: AccountProvider[];
}

export interface PreferenceSignatures {
  "pri(preference.subscribe)": [null, boolean, PerferenceStore];
  "pri(perference.completeOnboarding)": [null, boolean];
  "pri(perference.selectAccount)": [SelectAccountPaylod, boolean];
  "pri(perference.updateAccountProviders)": [
    UpdateAccountProvidersPayload,
    boolean
  ];
}
