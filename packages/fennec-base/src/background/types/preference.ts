import type { PreferenceStore, AccountProvider } from "../../state/types";

export interface SelectAccountPaylod {
  clientId: string;
}

export interface UpdateAccountProvidersPayload {
  providers: AccountProvider[];
}

export interface PreferenceSignatures {
  "pri_(preference.subscribe)": [null, boolean, PreferenceStore];
  "pri_(preference.completeOnboarding)": [null, boolean];
  "pri_(preference.selectAccount)": [SelectAccountPaylod, boolean];
  "pri_(preference.updateAccountProviders)": [
    UpdateAccountProvidersPayload,
    boolean
  ];
}
