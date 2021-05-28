import { PORT_EXTENSION } from "../constants";
import extension from "extensionizer";

export function isExtension(port: chrome.runtime.Port) {
  return port.name === PORT_EXTENSION;
}

export function stripUrl(url: string) {
  if (!url.startsWith("http:") && !url.startsWith("https:")) {
    throw new Error(`Invalid url ${url}, expect to start with http: or https:`);
  }

  return url.split("/")[2];
}

export function checkForError() {
  const { lastError } = extension.runtime;

  if (!lastError) {
    return undefined;
  }

  if (lastError.stack && lastError.message) {
    return lastError;
  }

  return new Error(lastError.message);
}

export function isEmpty(obj) {
  return Object.keys(obj).length === 0;
}
