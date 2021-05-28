import store from "../store/001.json";
import migration from "../../src/migrations/002";
import { BUILD_IN_MIXIN_ACCOUNT_PROVIDER } from "../../src/constants";

describe("migration 002 should work as expect", function () {
  test("store should be replaced with new prodiver url", function (done) {
    migration
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .migrate(store as any)
      .then((migrated) => {
        expect(migrated.version === 2);
        expect(
          migrated.preference.accountProviders[0].value ===
            BUILD_IN_MIXIN_ACCOUNT_PROVIDER
        );
        done();
      })
      .catch(done);
  });
});
