import dayjs from "dayjs";

export function format(opts: { t: string; p?: string }): string {
  opts.p = opts.p || "YYYY-MM-DD";

  return dayjs(opts.t).format(opts.p);
}
