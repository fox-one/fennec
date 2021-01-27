import type { Store, State } from "./types";

import { BehaviorSubject } from "rxjs";
import { initStoreData } from "./init-data";
import LcoalStore from "../utils/lcoal-store";
import AuthState from "./auth";
import KeyringState from "./keyring";
import PreferenceState from "./preference";

const localstore = new LcoalStore();

async function initStore() {
  let store = (await localstore.get()) as Store;
  if (!store) {
    store = initStoreData;
  }

  const storeSubject = new BehaviorSubject<Store>(store);
  storeSubject.subscribe((data: Store) => {
    localstore.set(data);
  });
  return storeSubject;
}

export default async function createState(): Promise<State> {
  const store = await initStore();
  return {
    auth: new AuthState({ store }),
    keyring: new KeyringState({ store }),
    preference: new PreferenceState({ store })
  };
}
