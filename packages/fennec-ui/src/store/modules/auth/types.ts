import type { AuthorizeRequest } from "@foxone/fennec-base/state/auth";

export const AuthModulePerfix = "auth/";

export const MutationTypes = {
  UPDATE_AUTHORIZE_REQUESTS: "UPDATE_AUTHORIZE_REQUESTS",
  UPDATE_AUTHORIZE_URLS: "UPDATE_AUTHORIZE_URLS"
} as const;

export type State = {
  authorizeRequests: AuthorizeRequest[];
};

export type Mutations = {
  [MutationTypes.UPDATE_AUTHORIZE_REQUESTS](
    s: State,
    v: AuthorizeRequest[]
  ): void;
  [MutationTypes.UPDATE_AUTHORIZE_URLS](s: State, v): void;
};
