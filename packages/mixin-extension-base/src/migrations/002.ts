import type { Store } from "../state/types";
import type { Migration } from "./types";

import cloneDeep from "lodash/cloneDeep";
import { BUILD_IN_MIXIN_ACCOUNT_PROVIDER } from "../constants";

const version = 2;

export default {
  version,

  migrate(originalVersionedData: Store) {
    const versionedData = cloneDeep(originalVersionedData);
    versionedData.version = version;
    try {
      const accountProviders = versionedData.preference.accountProviders;
      const index = accountProviders.findIndex((x) => x.type === "built-in");
      if (index > -1) {
        accountProviders[index].value = BUILD_IN_MIXIN_ACCOUNT_PROVIDER;
      }
    } catch (error) {
      // empty
    }
    return Promise.resolve(versionedData);
  }
} as Migration;
