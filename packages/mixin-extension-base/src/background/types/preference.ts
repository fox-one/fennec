import type { PerferenceStore, AccountProvider } from "../../state/types";

export interface SelectAccountPaylod {
  clientId: string;
}

export interface UpdateAccountProvidersPayload {
  providers: AccountProvider[];
}

export interface PreferenceSignatures {
  "pri_(preference.subscribe)": [null, boolean, PerferenceStore];
  "pri_(perference.completeOnboarding)": [null, boolean];
  "pri_(perference.selectAccount)": [SelectAccountPaylod, boolean];
  "pri_(perference.updateAccountProviders)": [
    UpdateAccountProvidersPayload,
    boolean
  ];
}
