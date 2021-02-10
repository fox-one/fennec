import type { ExchangeRate } from "@foxone/mixin-sdk/types";
import BigNumber from "bignumber.js";
import { format } from "./number";

export const CURRENCY = {
  CNY: { symbol: "¥", name: "CNY" },
  USD: { symbol: "$", name: "USD" }
};

export function currencyExchange(
  vm: Vue,
  opts: {
    n: BigNumber.Value;
    from?: string;
    to?: string;
  }
) {
  opts.from = opts.from || "USD";
  opts.to = opts.to || "USD";

  const rates: ExchangeRate[] = vm.$store.state.wallet.exchangeRates;
  const rateFrom = rates.find((x) => x.code === opts.from);
  const rateTo = rates.find((x) => x.code === opts.to);
  if (!rateTo || !rateFrom) {
    throw "Cannot found from or to asset in fiats rates";
  }
  const value = new BigNumber(opts.n).times(rateFrom.rate).div(rateTo.rate);
  const currency = CURRENCY[rateTo.code];
  return `${currency.symbol}${format({ n: value })} ${currency.name}`;
}
