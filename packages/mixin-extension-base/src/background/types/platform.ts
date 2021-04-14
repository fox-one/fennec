import { ALLOWED_PATH } from "../../constants";

export type AllowedPath = typeof ALLOWED_PATH[number];

export interface OpenWindowPayload {
  path: string;
}

export interface PlatformActionSignatures {
  "pri_(platform.closePopup)": [null, null];
  "pri_(platform.openWindow)": [OpenWindowPayload, boolean];
  "pri_(platform.onWindowClose)": [null, null];
}
