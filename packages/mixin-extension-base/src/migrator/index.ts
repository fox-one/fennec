import type { Store } from "../state/types";
import type { Migration } from "../migrations/types";

import { EventEmitter } from "events";

export default class Migrator extends EventEmitter {
  migrations: Migration[];

  defaultVersion: number;

  constructor(opts: { migrations: Migration[]; defaultVersion?: number }) {
    super();
    const migrations = opts.migrations || [];
    this.migrations = migrations.sort((a, b) => a.version - b.version);
    const lastMigration = this.migrations.slice(-1)[0];
    this.defaultVersion =
      opts.defaultVersion || (lastMigration && lastMigration.version) || 0;
  }

  async migrateData(versionedData: Store) {
    const pendingMigrations = this.migrations.filter(
      (migration) => migration.version > (versionedData.version || 0)
    );
    for (const migration of pendingMigrations) {
      try {
        const migratedData = await migration.migrate(versionedData);
        if (!migratedData) {
          throw new Error("Migrator - migration return empty data");
        }
        if (
          migratedData !== undefined &&
          migratedData.version !== migration.version
        ) {
          throw new Error("Migrator - migration did not update version number");
        }
        versionedData = migratedData;
      } catch (error) {
        const message = error.message;
        error.message = `Fennec migration error: ${message}`;
        this.emit("error", message);
        return versionedData;
      }
    }
    return versionedData;
  }

  generateInitStore(store: Store) {
    return {
      version: this.defaultVersion,
      ...store
    };
  }
}
