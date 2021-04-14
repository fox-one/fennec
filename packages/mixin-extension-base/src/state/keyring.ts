import type { Store, Resolver } from "./types";
import type { SignAuthorizeTokenPlayload } from "../background/types/keyring";
import type PlatformState from "../state/platform";

import { BehaviorSubject } from "rxjs";
import MixinKeyring from "@foxone/mixin-sdk/keyring";
import encryptor from "browser-passworder";
import { initKeyringData } from "./init-data";
import PreferenceState from "./preference";

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
  #keyring: KeyringType;

  #store: BehaviorSubject<Store>;

  #preference: PreferenceState;

  #platform: PlatformState;

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
    platform: PlatformState;
  }) {
    this.#store = opts.store;
    this.#preference = opts.preference;
    this.#platform = opts.platform;
    this.#keyring = new MixinKeyring();
    this.updateKeyringMemState(this.#state);
  }

  private get stored() {
    return this.#store.getValue()?.keyring;
  }

  public setUnLocked() {
    this.updateKeyringMemState({
      ...this.#state,
      isUnlocked: true
    });
  }

  public setLocked() {
    this.#keyring = undefined;
    this.updateKeyringMemState({
      ...this.#state,
      isUnlocked: false,
      accounts: []
    });
  }

  public async unlock(password: string) {
    if (!this.stored) {
      throw new Error("Cannot unlock keyring without previous stored value");
    }
    if (!this.#keyring) {
      this.#keyring = new MixinKeyring();
    }
    await this.#keyring.restore(this.stored, password);
    this.updateAccounts();
    this.setUnLocked();
    if (this.#unlockRequests.length > 0) {
      this.#unlockRequests.forEach((x) => x.resolve(true));
    }

    return true;
  }

  public async addNewAccount(keystore: string, password: string) {
    if (!this.#keyring) {
      this.#keyring = new MixinKeyring();
    }
    const newStored = await this.#keyring.addAccount(
      keystore,
      this.stored,
      password
    );
    await this.persistStore(newStored, password);
    await this.#keyring.restore(this.stored, password);

    this.setUnLocked();
    this.updateAccounts();
    return this.#state.accounts;
  }

  public async removeAccount(clientId: string, password: string) {
    if (!this.#keyring) {
      throw "No stored keyring";
    }
    const newStored = await this.#keyring.removeAccount(
      clientId,
      this.stored,
      password
    );
    await this.persistStore(newStored, password);
    await this.#keyring.restore(newStored, password);
    this.updateAccounts();
    return true;
  }

  public async exportAccount(clientId: string, password: string) {
    if (!this.#keyring) {
      throw "No stored keyring";
    }
    return this.#keyring.exportAccount(clientId, this.stored, password);
  }

  public async exportAllAccounts(password: string) {
    if (!this.#keyring) {
      throw "No stored keyring";
    }
    return this.#keyring.exportAllAccounts(this.stored, password);
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

  public async signClientToken({
    clientId,
    method,
    uri,
    data,
    scp,
    expire,
    payload
  }) {
    if (!this.#keyring) {
      throw "No stored keyring";
    }
    return this.#keyring.signClientToken(
      clientId,
      method,
      uri,
      data,
      scp,
      expire,
      payload
    );
  }

  public async getEncryptedPin(clientId: string, password: string) {
    return await MixinKeyring.getEncryptedPin(clientId, this.stored, password);
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
      this.#platform.showPopup();
    });
  }

  private updateKeyringMemState(data: KeyringMemState) {
    this.#state = {
      ...data,
      initialized: Boolean(this.#store.getValue().keyring)
    };
    this.keyringMemStateSubject.next(this.#state);
  }

  private updateAccounts() {
    const accounts = this.#keyring?.accounts ?? [];
    const seletedAccount = this.#preference.preference.seletedAccount;
    if (accounts.length === 0) {
      this.#preference.setSelectedAccount(undefined);
    } else {
      const found = accounts.find((x) => x.client_id === seletedAccount);
      if (!found) {
        this.#preference.setSelectedAccount(accounts[0]?.client_id);
      }
    }

    this.updateKeyringMemState({
      ...this.#state,
      accounts: accounts.map((x) => x.client_id)
    });
  }

  private async persistStore(stored: string, password: string) {
    const encrypted = await encryptor.encrypt(password, stored);
    this.#store.next({ ...this.#store.getValue(), keyring: encrypted });
  }
}
