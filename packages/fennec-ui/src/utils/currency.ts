import type { ExchangeRate } from "@foxone/mixin-api/types";
import BigNumber from "bignumber.js";

export const CURRENCY = {
  CNY: { name: "CNY", symbol: "¥" },
  USD: { name: "USD", symbol: "$" },
  JPY: { name: "JPY", symbol: "¥" },
  EUR: { name: "EUR", symbol: "€" },
  KRW: { name: "KRW", symbol: "₩" },
  HKD: { name: "HKD", symbol: "HK$" },
  GBP: { name: "GBP", symbol: "£" },
  AUD: { name: "AUD", symbol: "A$" },
  SGD: { name: "SGD", symbol: "S$" },
  MYR: { name: "MYR", symbol: "RM" },
  PHP: { name: "PHP", symbol: "₱" },
  AED: { name: "AED", symbol: "AED" }
};

export function getSymbol(vm: Vue) {
  return CURRENCY[vm.$store.state.app.settings.currency].symbol;
}

class CurrencyIntl {
  public locale = "en-US";

  public currency = "USD";

  private intl!: Intl.NumberFormat;

  private configs!: Partial<Intl.NumberFormatOptions>;

  constructor(configs: Partial<Intl.NumberFormatOptions> = {}) {
    this.configs = configs;

    this.updateIntl();
  }

  updateIntl() {
    this.intl = new Intl.NumberFormat(this.locale, {
      style: "currency",
      currency: this.currency,
      ...this.configs
    });
  }

  updateLocale(locale: string) {
    this.locale = locale;
    this.updateIntl();
  }

  updateCurrency(currency: string) {
    this.currency = currency;
    this.updateIntl();
  }

  format(value: number) {
    return this.intl.format(value);
  }

  formatToParts(value: number) {
    return this.intl.formatToParts(value);
  }
}

export const currencyIntl = new CurrencyIntl();

export function watch(vm: Vue) {
  // vm.$watch(
  //   function () {
  //     return this.$i18n.locale;
  //   },
  //   () => {
  //     currencyIntl.updateLocale();
  //   }
  // );

  vm.$watch(
    function () {
      return this.$store.state.app.settings.currency;
    },
    function (value) {
      currencyIntl.updateCurrency(value);
    },
    { immediate: true }
  );
}

export function toFiat(
  vm: Vue,
  opts: {
    n: BigNumber.Value;
    from?: string;
    intl?: boolean;
  }
): string {
  const from = opts.from ?? "USD";
  const to = vm.$store.state.app.settings.currency;
  const intl = opts.intl ?? true;

  const rates: ExchangeRate[] = vm.$store.state.wallet.exchangeRates;
  const rateFrom = rates.find((x) => x.code === from);
  const rateTo = rates.find((x) => x.code === to);

  if (!rateTo || !rateFrom) {
    return "";
  }

  const value = new BigNumber(opts.n)
    .div(rateFrom.rate)
    .times(rateTo.rate)
    .toNumber();

  if (intl) {
    return currencyIntl.format(value);
  }

  return value.toString();
}
