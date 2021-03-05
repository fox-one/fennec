import { PORT_EXTENSION } from "../constants";
import extension from "extensionizer";

export function isExtension(port: chrome.runtime.Port) {
  return port.name === PORT_EXTENSION;
}

export function stripUrl(url: string) {
  if (!url.startsWith("http:") && !url.startsWith("https:")) {
    throw `Invalid url ${url}, expect to start with http: or https:`;
  }

  return url.split("/")[2];
}

export function openPopup(windows: number[]) {
  const WINDOW_OPTS = {
    height: 620,
    left: 150,
    top: 150,
    type: "popup",
    url: chrome.extension.getURL("notification.html"),
    width: 360
  };

  extension.windows.create(
    { ...WINDOW_OPTS },
    (window: chrome.windows.Window) => {
      if (window) {
        windows.push(window.id);
      }
    }
  );
}

export function closePopup(windows: number[]) {
  windows.forEach((id) => {
    extension.windows.remove(id);
  });
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
