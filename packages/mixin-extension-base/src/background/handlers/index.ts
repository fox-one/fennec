import createExtensionHandler from "./extension";
import createTabHandler from "./tab";

export default function createHandlers(state) {
  return {
    extension: createExtensionHandler(state),
    tab: createTabHandler(state)
  };
}
