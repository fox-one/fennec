import type { Store, State } from "./types";

import { BehaviorSubject } from "rxjs";
import { initStoreData } from "./init-data";
import LcoalStore from "../utils/lcoalstore";
import AuthState from "./auth";
import KeyringState from "./keyring";
import PreferenceState from "./preference";
import AppState from "./app";
import WalletState from "./wallet";
import PlatformState from "./platform";
import Migrator from "../migrator";
import migrations from "../migrations/";

const localstore = new LcoalStore();

async function initStore() {
  const migrator = new Migrator({ migrations });
  migrator.on("error", (error) => {
    console.log(`Fennec migration error: ${error.message}`);
  });

  let store = ((await localstore.get()) ||
    migrator.generateInitStore(initStoreData)) as Store;

  store = await migrator.migrateData(store);
  localstore.set(store);

  const storeSubject = new BehaviorSubject<Store>(store);
  storeSubject.subscribe((data: Store) => {
    localstore.set(data);
  });
  return storeSubject;
}

export default async function createState(): Promise<State> {
  const store = await initStore();

  const platform = new PlatformState();
  const preference = new PreferenceState({ store });
  const auth = new AuthState({ store, platform });
  const keyring = new KeyringState({ store, preference, platform });
  const wallet = new WalletState({ platform });
  const app = new AppState({ store, keyring, preference, auth, wallet });

  return {
    app,
    platform,
    auth,
    keyring,
    preference,
    wallet
  };
}
