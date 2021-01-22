import AuthState from "./auth";

export interface Resolver<T> {
  reject: (err: Error) => void;
  resolve: (result: T) => void;
}

export interface State {
  auth: InstanceType<typeof AuthState>;
}
