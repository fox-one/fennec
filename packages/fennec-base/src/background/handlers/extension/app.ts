import type { State } from "../../../state/types";

export default function createAppHandlers(state: State) {
  return {
    resetApplication() {
      return state.app.resetApplication();
    }
  };
}
