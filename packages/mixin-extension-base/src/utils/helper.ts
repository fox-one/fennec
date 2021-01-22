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
    height: 621,
    left: 150,
    top: 150,
    type: "popup",
    url: chrome.extension.getURL("notification.html"),
    width: 560
  };

  extension.windows.create({ ...WINDOW_OPTS }, (window: chrome.windows.Window) => {
    if (window) {
      windows.push(window.id);
    }
  });
}

export function closePopup(id: number, windows: number[]) {
  windows.forEach(() => {
    extension.windows.remove(id);
  });

  windows = [];
}
