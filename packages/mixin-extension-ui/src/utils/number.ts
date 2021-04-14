import BigNumber from "bignumber.js";

BigNumber.config({
  EXPONENTIAL_AT: 12
});

export function getDefaultPercision(n: BigNumber.Value) {
  const v = new BigNumber(n);
  return v.gt(1e4) ? 2 : v.gt(1) ? 4 : 8;
}

export function format(opts: { n: BigNumber.Value; p?: number; mp?: number }) {
  const { n, p, mp } = opts;
  let percision = p || getDefaultPercision(n);
  if (mp) {
    percision = Math.min(percision, mp);
  }
  return new BigNumber(n).decimalPlaces(percision, 1).toFormat();
}

export function toPercision(opts: { n: BigNumber.Value; p: number }): string {
  const v = new BigNumber(opts.n);
  if (v.decimalPlaces() > opts.p) {
    return v.decimalPlaces(opts.p).toFormat({ decimalSeparator: "." });
  }
  return opts.n.toString();
}

export function toPercent(opts: {
  n: BigNumber.Value;
  p?: number;
  s?: boolean;
}) {
  opts.s = opts.s || false;
  const n = new BigNumber(opts.n).times(100);
  const v = format({ n: n.abs(), p: opts.p });
  const s = !opts.s ? "" : n.lte(0) ? "-" : "+";
  return `${s}${v}%`;
}

export function addSymbol(n: string | number): string {
  return Number(n) > 0 ? `+${n}` : `${n}`;
}
