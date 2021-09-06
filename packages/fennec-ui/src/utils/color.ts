import BigNumber from "bignumber.js";

const COLORS = {
  GRAY: "#78738F",
  GREEN: "#2CC94E",
  RED: "#F44C4C",
  WARNING: "#FFC107"
} as const;

const COLOR_STYLE = {
  GREEN_DOWN_RED_UP: "green_down_red_up",
  GREEN_UP_RED_DOWN: "green_up_red_down"
} as const;

export function getValueColor(_vm: Vue, value: BigNumber.Value): string {
  const v = new BigNumber(value);

  if (v.isZero()) {
    return COLORS.GRAY;
  }

  const style = "green_up_red_down";
  const colors =
    style === COLOR_STYLE.GREEN_UP_RED_DOWN
      ? { down: COLORS.RED, up: COLORS.GREEN }
      : { down: COLORS.GREEN, up: COLORS.RED };

  return v.lt(0) ? colors.down : colors.up;
}

export { COLORS, COLOR_STYLE };
