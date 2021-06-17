import type { InjectedAccount, AccountsSubInfo } from "../../inject/types";
import type { AuthUrlInfo } from "../../state/auth";

export interface ApproveAuthPayload {
  id: string;
}

export interface RejectAuthPayload {
  id: string;
}

export interface AuthTabPayload {
  origin: string;
}

export interface AuthRequests {
  id: string;
  payload: AuthTabPayload;
  url: string;
}

export interface UpdateAuthUrlPayload {
  id: string;
  data: AuthUrlInfo;
}

export interface AuthActionSignatures {
  // [ requestPayload, responseResult, subscriptionResponseResult ]
  "pri_(authorize.requests)": [null, boolean, AuthRequests[]];
  "pri_(authorize.list)": [null, Record<string, AuthUrlInfo>];
  "pri_(authorize.reject)": [RejectAuthPayload, boolean];
  "pri_(authorize.approve)": [ApproveAuthPayload, boolean];
  "pri_(authorize.authUrls)": [null, AuthUrlInfo[]];
  "pri_(authorize.update)": [UpdateAuthUrlPayload, boolean];

  "pub_(authorize.tab)": [AuthTabPayload, null];
  "pub_(accounts.ensureUnlocked)": [null, boolean];
  "pub_(accounts.list)": [null, InjectedAccount[]];
  "pub_(accounts.subscribe)": [null, boolean, AccountsSubInfo];
  "pub_(phishing.redirectIfDenied)": [null, boolean];
}
