declare namespace MixinApp {
  export type AppBarState = {
    title: string;
    show: boolean;
    back: boolean;
  };

  export type AppToastState = {
    show: boolean;
    color: string;
    message: string;
  };

  export type AppLayout = "default";

  export type Currency = "usd" | "cny" | "jpy";

  export type ColorStyle = "green_up_red_down" | "green_down_red_up";

  export type AppSettings = {
    currency: Currency;
    colorStyle: ColorStyle;
    dark: boolean;
  };
}
