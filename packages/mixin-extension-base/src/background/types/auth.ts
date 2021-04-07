import type { InjectedAccount } from "../../inject/types";
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
  "pri(authorize.requests)": [null, boolean, AuthRequests[]];
  "pri(authorize.list)": [null, Record<string, AuthUrlInfo>];
  "pri(authorize.reject)": [RejectAuthPayload, boolean];
  "pri(authorize.approve)": [ApproveAuthPayload, boolean];
  "pri(authorize.authUrls)": [null, AuthUrlInfo[]];
  "pri(authorize.update)": [UpdateAuthUrlPayload, boolean];

  "pub(authorize.tab)": [AuthTabPayload, null];
  "pub(accounts.ensureUnlocked)": [null, boolean];
  "pub(accounts.list)": [null, InjectedAccount[]];
  "pub(phishing.redirectIfDenied)": [null, boolean];
}
