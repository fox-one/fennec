import type { State } from "../../../state/types";
import { ResetApplicationPayload } from "../../types/app";

export default function createAppHandlers(state: State) {
  return {
    resetApplication(opts: ResetApplicationPayload) {
      return state.app.resetApplication(opts.password);
    }
  };
}
