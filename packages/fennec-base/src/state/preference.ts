import type { Store, PreferenceStore, AccountProvider } from "./types";

import { BehaviorSubject } from "rxjs";
import { initPreferenceData } from "./init-data";

export default class PreferenceState {
  #store: BehaviorSubject<Store>;

  #preference: PreferenceStore = initPreferenceData;

  preferenceSubjection: BehaviorSubject<PreferenceStore> =
    new BehaviorSubject<PreferenceStore>(this.#preference);

  get preference() {
    return this.#preference;
  }

  constructor(opts: { store: BehaviorSubject<Store> }) {
    this.#store = opts.store;
    this.restore();
  }

  public completeOnboarding() {
    return this.persist({ completeOnboarding: true });
  }

  public setSelectedAccount(clientId: string | undefined) {
    return this.persist({ selectedAccount: clientId });
  }

  public setAccountProviders(providers: AccountProvider[]) {
    return this.persist({ accountProviders: providers });
  }

  public restore() {
    const preference = this.#store.getValue().preference;

    this.#preference = preference;
    this.preferenceSubjection.next(preference);
  }

  private persist(data: Partial<PreferenceStore>) {
    const preference = { ...this.#store.getValue().preference, ...data };

    this.#store.next({ ...this.#store.getValue(), preference });
    this.restore();

    return true;
  }
}
