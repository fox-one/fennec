import { Store } from "../state/types";

export interface Migration {
  version: number;
  migrate: (data: Store) => Promise<Store>;
}
