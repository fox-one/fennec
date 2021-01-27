import type { State } from "../../../state/types";
import type { CreateAccountPayload } from "../../types/keyring";

export default function (state: State) {
  return {
    createAccount({ configStr }: CreateAccountPayload) {
      return state.keyring.addNewAccount(configStr);
    }
  };
}
