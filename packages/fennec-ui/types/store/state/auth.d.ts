declare namespace State {
  import type { AuthorizeRequest } from "@foxone/fennec-base/state/auth";

  export type AuthState = {
    authorizeRequests: AuthorizeRequest[];
  };
}
