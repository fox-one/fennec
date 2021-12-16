import * as currency from "@foxone/utils/currency";

import BigNumber from "bignumber.js";

export const CURRENCY = currency.currencies;

export function toFiat(
  vm: Vue,
  opts: { n: BigNumber.Value; short?: boolean; intl?: boolean; from?: string },
  part = false
) {
  const to = vm.$store.state.app.settings.currency;
  const rates = vm.$store.state.wallet.exchangeRates;

  const locale = vm.$i18n.locale;
  const configs = opts.short
    ? {
        maximumFractionDigits: 2,
        minimumFractionDigits: 2,
        notation: "compact" as const
      }
    : {};
  const intl = opts.intl ?? true;

  return currency.toFiat(
    { n: opts.n, configs, from: opts.from, to, rates, locale, intl },
    part
  );
}
