import type { Store, Resolver } from "./types";
import type { SignAuthorizeTokenPlayload } from "../background/types/keyring";

import { BehaviorSubject } from "rxjs";
import MixinKeyring from "@foxone/mixin-sdk/keyring";
import encryptor from "browser-passworder";
import { initKeyringData } from "./init-data";
import PreferenceState from "./preference";
import { closePopup, openPopup } from "../utils/helper";

export type KeyringType = MixinKeyring | undefined;

export interface UnlockRequest extends Resolver<boolean> {
  id: string;
}

let idCounter = 0;

function getId() {
  return `${Date.now()}.${++idCounter}`;
}

export type KeyringMemState = {
  isUnlocked: boolean;
  initialized: boolean;
  accounts: string[];
};

export default class KeyringState {
  #password: string | null = null;

  #keyring: KeyringType = undefined;

  #store: BehaviorSubject<Store>;

  #preference: PreferenceState;

  #windows = [];

  #state: KeyringMemState = initKeyringData;

  #unlockRequests: UnlockRequest[] = [];

  public readonly keyringMemStateSubject: BehaviorSubject<KeyringMemState> = new BehaviorSubject<KeyringMemState>(
    this.#state
  );

  public readonly unlockRequests: BehaviorSubject<
    UnlockRequest[]
  > = new BehaviorSubject<UnlockRequest[]>([]);

  constructor(opts: {
    preference: PreferenceState;
    store: BehaviorSubject<Store>;
  }) {
    this.#store = opts.store;
    this.#preference = opts.preference;

    this.updateKeyringMemState(this.#state);
  }

  public async addNewAccount(configs: string) {
    if (!this.#password) {
      throw new Error("Keyring has not been unlock, no password found");
    }

    if (!this.#keyring) {
      this.#keyring = new MixinKeyring();
    }

    this.#keyring.addAccount(configs);
    await this.persistKeyring(this.#keyring);
    await this.unLockKeyring(this.#password);

    this.setUnLocked();

    return this.#state.accounts;
  }

  public async removeAccount(clientId: string) {
    if (!this.#keyring) {
      throw "No stored keyring";
    }

    this.#keyring.removeAccount(clientId);
    this.persistKeyring(this.#keyring);
    this.restoreAccounts();
  }

  public async exportAccount(clientId: string) {
    if (!this.#keyring) {
      throw "No stored keyring";
    }

    return this.#keyring.exportAccount(clientId);
  }

  public async signAuthorizeToken({
    clientId,
    uri,
    method,
    data
  }: SignAuthorizeTokenPlayload) {
    if (!this.#keyring) {
      throw "No stored keyring";
    }

    return this.#keyring.signAuthorizeToken(clientId, method, uri, data);
  }

  public async encryptPin(clientId: string, pin: string) {
    if (!this.#keyring) {
      throw "No stored keyring";
    }

    return this.#keyring.encryptPin(clientId, pin);
  }

  public async submitPassword(password: string) {
    await this.unLockKeyring(password);
    this.setUnLocked();
    return true;
  }

  public async initializePassword(password: string) {
    this.#password = password;
    return true;
  }

  public setUnLocked() {
    this.updateKeyringMemState({
      ...this.#state,
      isUnlocked: true
    });
  }

  public setLocked() {
    this.#password = null;
    this.#keyring = undefined;
    this.updateKeyringMemState({
      ...this.#state,
      isUnlocked: false,
      accounts: []
    });
  }

  public async getEncryptedPin(clientId: string, password: string) {
    const stored = this.#store.getValue().keyring;
    if (!stored) {
      throw new Error("Cannot unlock keyring without previous stored value");
    }

    if (!this.#keyring) {
      throw new Error("cannot find #keying");
    }

    await encryptor.decrypt(password, stored);
    return await this.#keyring.getEncryptedPin(clientId);
  }

  public async getAccounts() {
    return this.#state.accounts;
  }

  public async ensureUnLocked(): Promise<boolean> {
    if (this.#state.isUnlocked) {
      return true;
    }

    return new Promise((resolve, reject) => {
      const id = getId();
      const unlockRequests = { id, resolve, reject };
      this.#unlockRequests.push(unlockRequests);

      openPopup(this.#windows);
    });
  }

  private async unLockKeyring(password: string) {
    const stored = this.#store.getValue().keyring;
    if (!stored) {
      throw new Error("Cannot unlock keyring without previous stored value");
    }

    this.#password = password;
    const decrypted = await encryptor.decrypt(this.#password, stored);

    const keyring = new MixinKeyring();
    keyring.deserialize(decrypted);

    this.#keyring = keyring;
    this.restoreAccounts();

    if (this.#unlockRequests.length > 0) {
      this.#unlockRequests.forEach((x) => x.resolve(true));
      closePopup(this.#windows);
    }
  }

  private clearKeying() {
    this.#keyring = undefined;
    this.#store.next({ ...this.#store.getValue(), keyring: undefined });
    this.restoreAccounts();
  }

  private updateKeyringMemState(data: KeyringMemState) {
    this.#state = {
      ...data,
      initialized: Boolean(this.#store.getValue().keyring)
    };
    this.keyringMemStateSubject.next(this.#state);
  }

  private restoreAccounts() {
    const accounts = this.#keyring?.getAccounts() ?? [];

    const seletedAccount = this.#preference.preference.seletedAccount;
    if (!seletedAccount && accounts) {
      this.#preference.setSelectedAccount(accounts[0]?.client_id);
    }

    this.updateKeyringMemState({
      ...this.#state,
      accounts: accounts.map((x) => x.client_id)
    });
  }

  private async persistKeyring(keyring: MixinKeyring) {
    const serialized = await keyring.serialize();
    const encrypted = await encryptor.encrypt(this.#password, serialized);
    const newStore = { ...this.#store.getValue(), keyring: encrypted };
    this.#store.next(newStore);
  }
}
