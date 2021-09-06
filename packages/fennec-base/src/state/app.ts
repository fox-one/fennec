import type { Store } from "./types";
import type PreferenceState from "./preference";
import type AuthState from "./auth";
import type KeyringState from "./keyring";
import type WalletState from "./wallet";
import { BehaviorSubject } from "rxjs";
import { initStoreData } from "./init-data";

export default class AppState {
  #store: BehaviorSubject<Store>;

  #preference: PreferenceState;

  #auth: AuthState;

  #keyring: KeyringState;

  #wallet: WalletState;

  constructor(opts: {
    store: BehaviorSubject<Store>;
    preference: PreferenceState;
    auth: AuthState;
    keyring: KeyringState;
    wallet: WalletState;
  }) {
    this.#store = opts.store;
    this.#preference = opts.preference;
    this.#auth = opts.auth;
    this.#keyring = opts.keyring;
    this.#wallet = opts.wallet;
  }

  resetApplication() {
    this.#store.next(initStoreData);
    this.#keyring.refresh();
    this.#preference.restore();
    this.#auth.restore();
    this.#auth.removeAuthRequests();
    this.#wallet.clearAllRawTransactionsRequests();
    this.#wallet.clearAllTransfers();

    return true;
  }
}
