import type { InjectedAccount } from "../../inject/types";
import type { AuthUrlInfo } from "../../state/auth";
import type { AccountJson } from "./account";

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

export interface AuthActionSignatures {
  "pri(accounts.subscribe)": [null, boolean, AccountJson[]];
  "pri(authorize.requests)": [null, boolean, AuthRequests[]];
  "pri(authorize.list)": [null, Record<string, AuthUrlInfo>];
  "pri(authorize.reject)": [RejectAuthPayload, boolean];
  "pri(authorize.approve)": [ApproveAuthPayload, boolean];

  "pub(authorize.tab)": [AuthTabPayload, null];
  "pub(accounts.list)": [null, InjectedAccount[]];
  "pub(phishing.redirectIfDenied)": [null, boolean];
}
