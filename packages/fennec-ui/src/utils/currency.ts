import type { ExchangeRate } from "@foxone/mixin-api/types";
import BigNumber from "bignumber.js";
import { format } from "./number";

type Currency = "CNY" | "USD";

type CurrencyMeta = Record<Currency, { name: string; symbol: string }>;

export const CURRENCY: CurrencyMeta = {
  CNY: { name: "CNY", symbol: "¥" },
  USD: { name: "USD", symbol: "$" }
};

export function currencyExchange(
  vm: Vue,
  opts: {
    n: BigNumber.Value;
    from?: Currency;
    to?: Currency;
  }
): string {
  opts.from = opts.from || "USD";
  opts.to = opts.to || "USD";

  const rates: ExchangeRate[] = vm.$store.state.wallet.exchangeRates;
  const rateFrom = rates.find((x) => x.code === opts.from);
  const rateTo = rates.find((x) => x.code === opts.to);

  if (!rateTo || !rateFrom) {
    return "";
  }

  const value = new BigNumber(opts.n).times(rateFrom.rate).div(rateTo.rate);
  const currency = CURRENCY[rateTo.code as Currency];

  return `${currency.symbol}${format({ n: value })} ${currency.name}`;
}
