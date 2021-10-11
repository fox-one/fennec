import type { Store, Resolver } from "./types";
import type { SignAuthorizeTokenPlayload } from "../background/types/keyring";
import type PlatformState from "./platform";

import { BehaviorSubject } from "rxjs";
import MixinKeyring from "@foxone/mixin-api/keyring";
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

  public readonly keyringMemStateSubject: BehaviorSubject<KeyringMemState> =
    new BehaviorSubject<KeyringMemState>(this.#state);

  public readonly unlockRequests: BehaviorSubject<UnlockRequest[]> =
    new BehaviorSubject<UnlockRequest[]>([]);

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
    this.updateKeyringMemState({ isUnlocked: true });
  }

  public setLocked() {
    this.#keyring = undefined;
    this.updateKeyringMemState({ accounts: [], isUnlocked: false });
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

    await this.persist(newStored, password);
    await this.#keyring.restore(this.stored, password);

    this.updateAccounts();
    this.setUnLocked();

    return this.#state.accounts;
  }

  public async removeAccount(clientId: string, password: string) {
    if (!this.#keyring) {
      throw new Error("No stored keyring");
    }

    const newStored = await this.#keyring.removeAccount(
      clientId,
      this.stored,
      password
    );

    await this.persist(newStored, password);
    await this.#keyring.restore(this.stored, password);
    this.updateAccounts();

    return true;
  }

  public async exportAccount(clientId: string, password: string) {
    if (!this.#keyring) {
      throw new Error("No stored keyring");
    }

    return this.#keyring.exportAccount(clientId, this.stored, password);
  }

  public async exportAllAccounts(password: string) {
    if (!this.#keyring) {
      throw new Error("No stored keyring");
    }

    return this.#keyring.exportAllAccounts(this.stored, password);
  }

  public async signAuthorizeToken({
    clientId,
    data,
    method,
    uri
  }: SignAuthorizeTokenPlayload) {
    if (!this.#keyring) {
      throw new Error("No stored keyring");
    }

    return this.#keyring.signAuthorizeToken(clientId, method, uri, data);
  }

  public async signClientToken({
    clientId,
    data,
    expire,
    method,
    payload,
    scp,
    uri
  }) {
    if (!this.#keyring) {
      throw new Error("No stored keyring");
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

  public getAccounts() {
    return this.#state.accounts;
  }

  public async ensureUnLocked(): Promise<boolean> {
    if (this.#state.isUnlocked) {
      return true;
    }

    return new Promise((resolve, reject) => {
      const id = getId();
      const unlockRequests = { id, reject, resolve };

      this.#unlockRequests.push(unlockRequests);
      this.#platform.showPopup().catch((error) => {
        console.error("show popup error", error);
      });
    });
  }

  public refresh() {
    this.#keyring = new MixinKeyring();
    this.updateKeyringMemState(initKeyringData);
  }

  private updateKeyringMemState(data: Partial<KeyringMemState>) {
    this.#state = {
      ...this.#state,
      ...data,
      initialized: Boolean(this.#store.getValue().keyring)
    };
    this.keyringMemStateSubject.next(this.#state);
  }

  private updateAccounts() {
    const accounts = this.#keyring?.accounts ?? [];
    const selectedAccount = this.#preference.preference.selectedAccount;

    if (accounts.length === 0) {
      this.#preference.setSelectedAccount(undefined);
    } else {
      const found = accounts.find((x) => x.client_id === selectedAccount);

      if (!found) {
        this.#preference.setSelectedAccount(accounts[0]?.client_id);
      }
    }

    this.updateKeyringMemState({
      accounts: accounts.map((x) => x.client_id)
    });
  }

  private async persist(stored: string, password: string) {
    const encrypted = await encryptor.encrypt(password, stored);

    this.#store.next({ ...this.#store.getValue(), keyring: encrypted });
  }
}
