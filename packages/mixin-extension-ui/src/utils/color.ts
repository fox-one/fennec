import BigNumber from "bignumber.js";

const COLORS = {
  RED: "#E23A3A",
  GREEN: "#009621",
  GRAY: "#959595",
  WARNING: "#FFC107"
} as const;

const COLOR_STYLE = {
  GREEN_UP_RED_DOWN: "green_up_red_down",
  GREEN_DOWN_RED_UP: "green_down_red_up"
} as const;

export function getValueColor(_vm: Vue, value: BigNumber.Value) {
  const v = new BigNumber(value);
  if (v.isZero()) {
    return COLORS.GRAY;
  }

  const style = "green_up_red_down";
  const colors =
    style === COLOR_STYLE.GREEN_UP_RED_DOWN
      ? { up: COLORS.GREEN, down: COLORS.RED }
      : { up: COLORS.RED, down: COLORS.GREEN };

  return v.lt(0) ? colors.down : colors.up;
}

export { COLORS, COLOR_STYLE };
