import extension from "extensionizer";
import { checkForError, isEmpty } from "./helper";

export default class ExtensionStore {
  private isSupported = false;

  constructor() {
    this.isSupported = Boolean(extension.storage.local);

    if (!this.isSupported) {
      console.error("Storage local API not available.");
    }
  }

  public async get() {
    if (!this.isSupported) {
      return undefined;
    }

    const result = await this._get();

    if (isEmpty(result)) {
      return undefined;
    }

    return result;
  }

  async set(state) {
    return this._set(state);
  }

  private _get() {
    const { local } = extension.storage;

    return new Promise((resolve, reject) => {
      local.get(null, (result) => {
        const err = checkForError();

        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }

  private _set(obj) {
    const { local } = extension.storage;

    return new Promise<void>((resolve, reject) => {
      local.set(obj, () => {
        const err = checkForError();

        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }
}
