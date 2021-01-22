import AuthState from "./auth";

export default function createState() {
  return {
    auth: new AuthState()
  };
}
