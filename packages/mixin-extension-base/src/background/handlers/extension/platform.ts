import type { State } from "../../../state/types";

export default function (state: State) {
  return {
    closePopup() {
      state.platform.closePopup();
      return true;
    },
    openPopup() {
      return state.platform.showPopup();
    }
  };
}
