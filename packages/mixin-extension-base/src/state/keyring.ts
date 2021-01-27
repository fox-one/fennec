import type { Store } from "./types";
import type { SignAuthorizeTokenPlayload } from "../background/types/keyring";

import { BehaviorSubject } from "rxjs";
import MixinKeyring from "@foxone/mixin-sdk/keyring";
import encryptor from "browser-passworder";

export type KeyringType = MixinKeyring | undefined;

export type KeyringMemState = {
  keyring: KeyringType;
  isUnlocked: boolean;
};

export default class KeyringState {
  #keyring: KeyringType;

  #password = "";

  #store: BehaviorSubject<Store>;

  #memState: KeyringMemState = {
    keyring: undefined,
    isUnlocked: false
  };

  public readonly keyringSubject: BehaviorSubject<KeyringMemState> = new BehaviorSubject<KeyringMemState>(
    this.#memState
  );

  constructor(opts: { store: BehaviorSubject<Store> }) {
    this.#store = opts.store;
  }

  public async addNewAccount(configs: string) {
    await this.persistKeyring();
    const keyring = this.#keyring || new MixinKeyring();
    keyring.addAccount(configs);
    await this.persistKeyring();
    this.restoreKeyring(keyring);
    this.setUnLocked();

    return true;
  }

  public async removeAccount(clientId: string) {
    await this.persistKeyring();
    if (!this.#keyring) {
      throw "No stored keyring";
    }

    this.#keyring.removeAccount(clientId);
    this.persistKeyring();
  }

  public async exportAccount(clientId: string) {
    if (!this.#keyring) {
      throw "No stored keyring";
    }

    return this.#keyring.exportAccount(clientId);
  }

  public async signAuthorizeToken({ clientId, uri, method, params }: SignAuthorizeTokenPlayload) {
    if (!this.#keyring) {
      throw "No stored keyring";
    }

    return this.#keyring.signAuthorizeToken(clientId, method, uri, params);
  }

  public async signPin(clientId: string) {
    if (!this.#keyring) {
      throw "No stored keyring";
    }

    return this.#keyring.encryptPin(clientId);
  }

  public async submitPassword(password: string) {
    this.unLockKeyring(password);
    this.setUnLocked();
  }

  private unLockKeyring(password: string) {
    const stored = this.#store.getValue().keyring;
    if (!stored) {
      throw new Error("Cannot unlock keyring without previous stored value");
    }

    this.clearKeying();
    this.#password = password;
    const decrypted = encryptor.decrypt(this.#password, stored);
    const keyring = new MixinKeyring();
    keyring.deserialize(decrypted);
    this.restoreKeyring(keyring);
  }

  private setUnLocked() {
    this.#memState = { ...this.#memState, isUnlocked: true };
    this.updateKeyringSubject();
  }

  private restoreKeyring(keyring: KeyringType) {
    this.#keyring = keyring;
    this.#memState = { ...this.#memState, keyring };
    this.updateKeyringSubject();
  }

  private clearKeying() {
    this.#keyring = undefined;
    this.#memState = { ...this.#memState, keyring: undefined };
    this.updateKeyringSubject();
  }

  private updateKeyringSubject() {
    this.keyringSubject.next(this.#memState);
  }

  private async persistKeyring() {
    const serialized = await this.#keyring?.serialize();
    const encrypted = encryptor.encrypt(this.#password, serialized);
    const newStore = { ...this.#store.getValue(), keyring: encrypted };
    this.#store.next(newStore);
  }
}
