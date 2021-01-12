import extension from "extensionizer";
import log from "loglevel";
import { isEmpty, checkError } from "./helper";

export default class ExtensionStore {
  isSupported!: boolean;

  constructor() {
    this.isSupported = Boolean(extension.storage.local);
    if (!this.isSupported) {
      log.error("Storage local API not available.");
    }
  }

  async get() {
    if (!this.isSupported) {
      return undefined;
    }

    const result = this._get();
    if (isEmpty(result)) {
      return undefined;
    }

    return result;
  }

  async set(data) {
    return this._set(data);
  }

  _get() {
    const { local } = extension.storage;
    return new Promise((resolve, reject) => {
      local.get(null, result => {
        const err = checkError();
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }

  _set(obj) {
    const { local } = extension.storage;
    return new Promise<void>((resolve, reject) => {
      local.set(obj, () => {
        const err = checkError();
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }
}
