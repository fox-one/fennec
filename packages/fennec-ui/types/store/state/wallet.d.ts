declare namespace State {
  import type { Asset, ExchangeRate, User } from "@foxone/mixin-api/types";

  export type WalletState = {
    me: User | null;
    assets: Asset[];
    additionAssets: Asset[];
    exchangeRates: ExchangeRate[];
    users: User[];
    authError: boolean;
  };
}
