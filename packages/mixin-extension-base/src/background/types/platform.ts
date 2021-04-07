import { ALLOWED_PATH } from "../../constants";

export type AllowedPath = typeof ALLOWED_PATH[number];

export interface OpenWindowPayload {
  path: string;
}

export interface PlatformActionSignatures {
  "pri(platform.closePopup)": [null, null];
  "pri(platform.openWindow)": [OpenWindowPayload, boolean];
}
