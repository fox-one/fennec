export interface ResetApplicationPayload {
  password: string;
}

export interface AppActionSignatures {
  "pri_(app.resetApplication)": [ResetApplicationPayload, null];
}
