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
import migrations from "../migrations";

const localstore = new LcoalStore();

async function initStore() {
  const migrator = new Migrator({ migrations });

  migrator.on("error", (error: Error) => {
    console.log(`Fennec migration error: ${error.message}`);
  });

  let store = ((await localstore.get()) ||
    migrator.generateInitStore(initStoreData)) as Store;

  store = await migrator.migrateData(store);
  await localstore.set(store);

  const storeSubject = new BehaviorSubject<Store>(store);

  storeSubject.subscribe((data: Store) => {
    localstore.set(data).catch((error) => {
      console.log("presist store error: ", error);
    });
  });

  return storeSubject;
}

export default async function createState(): Promise<State> {
  const store = await initStore();

  const platform = new PlatformState();
  const preference = new PreferenceState({ store });
  const auth = new AuthState({ platform, store });
  const keyring = new KeyringState({ platform, preference, store });
  const wallet = new WalletState({ platform });
  const app = new AppState({ auth, keyring, preference, store, wallet });

  return {
    app,
    auth,
    keyring,
    platform,
    preference,
    wallet
  };
}
