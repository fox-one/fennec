import type { Store } from "./types";
import { BehaviorSubject } from "rxjs";
import AuthState from "./auth";
import KeyringState from "./keyring";
import LcoalStore from "../utils/lcoal-store";

const localstore = new LcoalStore();
const initStoreData = {
  authUrls: {},
  keyring: undefined
};

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

export default async function createState() {
  const store = await initStore();
  return {
    auth: new AuthState({ store }),
    keyring: new KeyringState({ store })
  };
}
