import type { Store, PerferenceStore } from "./types";

import { BehaviorSubject } from "rxjs";
import { initPerferenceData } from "./init-data";

export default class PerferenceState {
  #store: BehaviorSubject<Store>;

  #preference: PerferenceStore = initPerferenceData;

  perferenceSubjection: BehaviorSubject<PerferenceStore> = new BehaviorSubject<PerferenceStore>(
    this.#preference
  );

  get preference() {
    return this.#preference;
  }

  constructor(opts: { store: BehaviorSubject<Store> }) {
    this.#store = opts.store;
    const preference = this.#store.getValue().preference;
    this.updatePerference(preference);
    this.#preference = preference;
  }

  completeOnboarding() {
    const preference: PerferenceStore = {
      ...this.#preference,
      completeOnboarding: true
    };
    this.updatePerference(preference);
    return true;
  }

  setSelectedAccount(clientId: string | undefined) {
    const preference: PerferenceStore = {
      ...this.#preference,
      seletedAccount: clientId
    };
    this.updatePerference(preference);
    return true;
  }

  private updatePerference(data: PerferenceStore) {
    console.log(`updatePerference: data :: ${data}`);
    this.#preference = data;
    this.perferenceSubjection.next(data);
    this.#store.next({ ...this.#store.getValue(), preference: data });
  }
}
