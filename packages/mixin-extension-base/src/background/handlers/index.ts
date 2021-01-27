import type { State } from "../../state/types";
import createExtensionHandler from "./extension";
import createTabHandler from "./tab";

export default function createHandlers(state: State) {
  return {
    extension: createExtensionHandler(state),
    tab: createTabHandler(state)
  };
}
