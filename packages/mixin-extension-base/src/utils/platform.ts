import extension from "extensionizer";
import { checkForError } from "./helper";

export function reload() {
  extension.runtime.reload();
}

export function openTab(options) {
  return new Promise((resolve, reject) => {
    extension.tabs.create(options, (newTab) => {
      const error = checkForError();
      if (error) {
        return reject(error);
      }
      return resolve(newTab);
    });
  });
}

export function openWindow(options) {
  return new Promise((resolve, reject) => {
    extension.windows.create(options, (newWindow) => {
      const error = checkForError();
      if (error) {
        return reject(error);
      }
      return resolve(newWindow);
    });
  });
}

export function closeWindow(id) {
  return new Promise<void>((resolve, reject) => {
    extension.windows.remove(id, () => {
      const error = checkForError();
      if (error) {
        return reject(error);
      }
      return resolve();
    });
  });
}

export function focusWindow(windowId) {
  return new Promise<void>((resolve, reject) => {
    extension.windows.update(windowId, { focused: true }, () => {
      const error = checkForError();
      if (error) {
        return reject(error);
      }
      return resolve();
    });
  });
}

export function updateWindowPosition(windowId, left, top) {
  return new Promise<void>((resolve, reject) => {
    extension.windows.update(windowId, { left, top }, () => {
      const error = checkForError();
      if (error) {
        return reject(error);
      }
      return resolve();
    });
  });
}

export function getLastFocusedWindow() {
  return new Promise((resolve, reject) => {
    extension.windows.getLastFocused((windowObject) => {
      const error = checkForError();
      if (error) {
        return reject(error);
      }
      return resolve(windowObject);
    });
  });
}

export function closeCurrentWindow() {
  return extension.windows.getCurrent((windowDetails) => {
    return extension.windows.remove(windowDetails.id);
  });
}

export function getVersion() {
  return extension.runtime.getManifest().version;
}

export function openExtensionInBrowser(route = null, queryString = null) {
  let extensionURL = extension.runtime.getURL("home.html");
  if (queryString) {
    extensionURL += `?${queryString}`;
  }

  if (route) {
    extensionURL += `#${route}`;
  }
  openTab({ url: extensionURL });
  window.close();
}

export function getPlatformInfo(cb) {
  try {
    extension.runtime.getPlatformInfo((platform) => {
      cb(null, platform);
    });
  } catch (error) {
    cb(error);
    return;
  }
}

export function getAllWindows() {
  return new Promise((resolve, reject) => {
    extension.windows.getAll((windows) => {
      const error = checkForError();
      if (error) {
        return reject(error);
      }
      return resolve(windows);
    });
  });
}

export function getActiveTabs() {
  return new Promise((resolve, reject) => {
    extension.tabs.query({ active: true }, (tabs) => {
      const error = checkForError();
      if (error) {
        return reject(error);
      }
      return resolve(tabs);
    });
  });
}

export function currentTab() {
  return new Promise((resolve, reject) => {
    extension.tabs.getCurrent((tab) => {
      const error = checkForError();
      if (error) {
        reject(error);
      } else {
        resolve(tab);
      }
    });
  });
}

export function switchToTab(tabId) {
  return new Promise((resolve, reject) => {
    extension.tabs.update(tabId, { highlighted: true }, (tab) => {
      const error = checkForError();
      if (error) {
        reject(error);
      } else {
        resolve(tab);
      }
    });
  });
}

export function closeTab(tabId) {
  return new Promise<void>((resolve, reject) => {
    extension.tabs.remove(tabId, () => {
      const error = checkForError();
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });
  });
}
