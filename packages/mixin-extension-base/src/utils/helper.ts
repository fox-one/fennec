import { PORT_EXTENSION } from "../constants";

export function isExtension(port: chrome.runtime.Port) {
  return port.name === PORT_EXTENSION;
}
